import { CircleX } from "lucide-react";
import InputField from "./InputField.jsx";
import TextArea from "./TextArea.jsx";
import Popup from "./Popup.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedEntry } from "../store/slices/entryFormSlice.js";

function TruckEntryDetails() {
    const dispatch = useDispatch();
    const { selectedEntry } = useSelector((state) => state.entryForm);

    if (!selectedEntry) return null;

    const handleClose = () => {
        dispatch(setSelectedEntry(null));
    };

    const content = (
        <div className="drop-shadow-2xl h-[50rem] w-max bg-white rounded z-999 overflow-auto p-10 relative">
            <h1 className="text-2xl font-extrabold text-[#636ae8]">Truck Entry Details</h1>
            <CircleX
                className="absolute top-10 right-10 cursor-pointer text-[#636ae8]"
                onClick={handleClose}
            />
            <div className="flex flex-col gap-5 mx-5 my-10">
                {/* Vehicle Details */}
                <div className="flex justify-between gap-2">
                    <InputField
                        label="Consignment No"
                        type="text"
                        name="consignmentNo"
                        value={selectedEntry.consignmentNo}
                        isDisabled={true}
                    />
                    <InputField
                        label="Date"
                        type="date"
                        name="date"
                        value={selectedEntry.date}
                        isDisabled={true}
                    />
                    <InputField
                        label="Vehicle No"
                        type="text"
                        name="vehicleNo"
                        value={selectedEntry.vehicleNo}
                        isDisabled={true}
                    />
                    <InputField
                        label="Vehicle Type"
                        type="text"
                        name="vehicleType"
                        value={selectedEntry.vehicleType}
                        isDisabled={true}
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
                            value={selectedEntry.consignorName}
                            isDisabled={true}
                        />
                        <InputField
                            label="Consignor GSTIN"
                            type="text"
                            name="consignorGSTIN"
                            value={selectedEntry.consignorGSTIN}
                            isDisabled={true}
                        />
                        <InputField
                            label="Consignor State"
                            type="text"
                            name="consignorState"
                            value={selectedEntry.consignorState}
                            isDisabled={true}
                        />
                        <TextArea
                            label="Consignor Address"
                            name="consignorAddress"
                            value={selectedEntry.consignorAddress}
                            isDisabled={true}
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
                            value={selectedEntry.consigneeName}
                            isDisabled={true}
                        />
                        <InputField
                            label="Consignee GSTIN"
                            type="text"
                            name="consigneeGSTIN"
                            value={selectedEntry.consigneeGSTIN}
                            isDisabled={true}
                        />
                        <InputField
                            label="Consignee State"
                            type="text"
                            name="consigneeState"
                            value={selectedEntry.consigneeState}
                            isDisabled={true}
                        />
                        <TextArea
                            label="Consignee Address"
                            name="consigneeAddress"
                            value={selectedEntry.consigneeAddress}
                            isDisabled={true}
                        />
                    </div>
                </div>

                {/* Other Details */}
                <div className="flex justify-between gap-2">
                    <InputField
                        label="From"
                        type="text"
                        name="from"
                        value={selectedEntry.from}
                        isDisabled={true}
                    />
                    <InputField
                        label="To"
                        type="text"
                        name="to"
                        value={selectedEntry.to}
                        isDisabled={true}
                    />
                    <InputField
                        label="Vehicle Weight"
                        type="number"
                        name="vehicleWeight"
                        value={selectedEntry.vehicleWeight}
                        isDisabled={true}
                    />
                    <InputField
                        label="Amount"
                        type="number"
                        name="amount"
                        value={selectedEntry.amount}
                        isDisabled={true}
                    />
                </div>
            </div>
        </div>
    );

    return <Popup isFormOpen={!!selectedEntry} content={content} />;
}

export default TruckEntryDetails;
