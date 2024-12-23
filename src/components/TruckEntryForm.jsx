import { CircleX } from "lucide-react";
import InputField from "./InputField.jsx";
import TextArea from "./TextArea.jsx";
import Popup from "./Popup.jsx";
import PropTypes from "prop-types";
import Button from "./Button.jsx";
import { useDispatch } from "react-redux";
import {addFormData, toggleEntryForm} from "../store/slices/entryFormSlice.js";
import { auth, db } from "../firebase/firebase.js";
import { doc, updateDoc, arrayUnion, setDoc } from "firebase/firestore";
import { useState } from "react";

function TruckEntryForm({ isEntryFormOpen }) {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        consignmentNo: Number,
        date: "",
        vehicleNo: "",
        vehicleType: "",
        consignorName: "",
        consignorAddress: "",
        consignorState: "",
        consignorGSTIN: "",
        consigneeName: "",
        consigneeAddress: "",
        consigneeState: "",
        consigneeGSTIN: "",
        from: "",
        to: "",
        vehicleWeight: Number,
        amount: Number,
    });

    const handleUpdate = (key, value) => {
        setFormData((prevState) => ({ ...prevState, [key]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;
        if (user) {
            const truckDoc = doc(db, "truck-entries", user.uid);
            try {
                await updateDoc(truckDoc, {
                    entries: arrayUnion(formData),
                }).catch(async (error) => {
                    if (error.code === "not-found") {
                        await setDoc(truckDoc, { entries: [formData] });
                    } else {
                        throw error;
                    }
                });
                dispatch(addFormData([formData]));
                dispatch(toggleEntryForm());
            } catch (error) {
                console.error("Error saving user data:", error.message);
            }
        } else {
            console.error("No user is logged in.");
        }
    };


    const content = (
        <form
            className="drop-shadow-2xl h-[50rem] w-max bg-white rounded z-999 overflow-auto p-10"
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl font-extrabold text-[#636ae8]">Enter Details</h1>
            <CircleX
                className="absolute top-10 right-10 cursor-pointer text-[#636ae8]"
                onClick={() => dispatch(toggleEntryForm())}
            />
            <div className="flex flex-col gap-5 mx-5 my-10">
                {/* Vehicle Details */}
                <div className="flex justify-between gap-2">
                    <InputField
                        label="Consignment No"
                        type="number"
                        name="consignmentNo"
                        value={formData.consignmentNo}
                        onChange={(value) => handleUpdate("consignmentNo", value)}
                    />
                    <InputField
                        label="Date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={(value) => handleUpdate("date", value)}
                    />
                    <InputField
                        label="Vehicle No"
                        type="text"
                        name="vehicleNo"
                        value={formData.vehicleNo}
                        onChange={(value) => handleUpdate("vehicleNo", value)}
                    />
                    <InputField
                        label="Vehicle Type"
                        type="text"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={(value) => handleUpdate("vehicleType", value)}
                    />
                </div>

                {/* Consignor Details */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-bold text-[#636ae8]">Consignor Details</h1>
                    <div className="flex justify-between gap-2">
                        <InputField
                            label="Consignor Name"
                            type="text"
                            name="consignorName"
                            value={formData.consignorName}
                            onChange={(value) => handleUpdate("consignorName", value)}
                        />
                        <InputField
                            label="Consignor GSTIN"
                            type="text"
                            name="consignorGSTIN"
                            value={formData.consignorGSTIN}
                            onChange={(value) => handleUpdate("consignorGSTIN", value)}
                        />
                        <InputField
                            label="Consignor State"
                            type="text"
                            name="consignorState"
                            value={formData.consignorState}
                            onChange={(value) => handleUpdate("consignorState", value)}
                        />
                        <TextArea
                            label="Consignor Address"
                            name="consignorAddress"
                            value={formData.consignorAddress}
                            onChange={(value) => handleUpdate("consignorAddress", value)}
                        />
                    </div>
                </div>

                {/* Consignee Details */}
                <div className="flex flex-col gap-3">
                    <h1 className="text-xl font-bold text-[#636ae8]">Consignee Details</h1>
                    <div className="flex justify-between gap-2">
                        <InputField
                            label="Consignee Name"
                            type="text"
                            name="consigneeName"
                            value={formData.consigneeName}
                            onChange={(value) => handleUpdate("consigneeName", value)}
                        />
                        <InputField
                            label="Consignee GSTIN"
                            type="text"
                            name="consigneeGSTIN"
                            value={formData.consigneeGSTIN}
                            onChange={(value) => handleUpdate("consigneeGSTIN", value)}
                        />
                        <InputField
                            label="Consignee State"
                            type="text"
                            name="consigneeState"
                            value={formData.consigneeState}
                            onChange={(value) => handleUpdate("consigneeState", value)}
                        />
                        <TextArea
                            label="Consignee Address"
                            name="consigneeAddress"
                            value={formData.consigneeAddress}
                            onChange={(value) => handleUpdate("consigneeAddress", value)}
                        />
                    </div>
                </div>

                {/* Other Details */}
                <div className="flex justify-between gap-2">
                    <InputField
                        label="From"
                        type="text"
                        name="from"
                        value={formData.from}
                        onChange={(value) => handleUpdate("from", value)}
                    />
                    <InputField
                        label="To"
                        type="text"
                        name="to"
                        value={formData.to}
                        onChange={(value) => handleUpdate("to", value)}
                    />
                    <InputField
                        label="Vehicle Weight"
                        type="number"
                        name="vehicleWeight"
                        value={formData.vehicleWeight}
                        onChange={(value) => handleUpdate("vehicleWeight", value)}
                    />
                    <InputField
                        label="Amount"
                        type="number"
                        name="amount"
                        value={formData.amount}
                        onChange={(value) => handleUpdate("amount", value)}
                    />
                </div>
            </div>
            <Button type="submit" name="Submit" styles="relative bottom-5 left-[90%]" />
        </form>
    );

    return <Popup isFormOpen={isEntryFormOpen} content={content} />;
}

TruckEntryForm.propTypes = {
    isEntryFormOpen: PropTypes.bool,
};

export default TruckEntryForm;
