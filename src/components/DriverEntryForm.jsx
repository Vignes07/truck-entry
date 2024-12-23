import Popup from "./Popup.jsx";
import {CircleX, Edit2} from "lucide-react";
import { addDriver, toggleDriverForm } from "../store/slices/driverFormSlice.js";
import InputField from "./InputField.jsx";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Button from "./Button.jsx";
import PropTypes from "prop-types";
import { auth, db } from "../firebase/firebase.js";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import TextArea from "./TextArea.jsx";

function DriverEntryForm({ isFormOpen }) {
    const dispatch = useDispatch();

    const [profilePic, setProfilePic] = useState("");
    const [driverName, setDriverName] = useState("");
    const [age, setAge] = useState("");
    const [driversLicense, setDriversLicense] = useState("");
    const [driverAddress, setDriverAddress] = useState("")
    const [phoneNo, setPhoneNo] = useState()

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setProfilePic(reader.result);
            } else {
                console.error("FileReader result is not a string.");
            }
        };
        reader.onerror = () => {
            console.error("Error reading the file.");
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const driverData = {
            profilePic,
            name: driverName,
            age,
            license: driversLicense,
            address: driverAddress
        };

        const user = auth.currentUser;
        if (user) {
            const driverDoc = doc(db, "driver-entries", user.uid);
            try {
                await updateDoc(driverDoc, {
                    entries: arrayUnion(driverData),
                }).catch(async (error) => {
                    if (error.code === "not-found") {
                        await setDoc(driverDoc, { entries: [driverData] });
                    } else {
                        throw error;
                    }
                });
                dispatch(addDriver(driverData));
                dispatch(toggleDriverForm());
            } catch (error) {
                console.error("Error saving user data:", error.message);
            }
        } else {
            console.error("No user is logged in.");
        }
    };

    const content = (
        <form
            className="drop-shadow-2xl h-fit w-max bg-white rounded z-999 overflow-auto p-10"
            onSubmit={handleSubmit}
        >
            <h1 className="text-2xl font-extrabold text-[#636ae8]">Driver Details</h1>
            <CircleX
                className="absolute top-10 right-10 cursor-pointer text-[#636ae8]"
                onClick={() => dispatch(toggleDriverForm())}
            />
            <div className="flex flex-col justify-between items-center gap-4 m-2">
                <div className="relative">
                    <img
                        className="object-cover w-24 h-24 rounded-full mt-4"
                        src={profilePic || "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"}
                        alt="Profile picture"
                    />
                    <label
                        htmlFor="file-upload"
                        className="absolute bottom-0 w-24 h-24 flex items-center justify-center bg-gray-300 bg-opacity-40 rounded-full opacity cursor-pointer"
                    >
                        <Edit2 className="text-white w-5 h-6"/>
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>

                <div className="flex flex-col justify-between items-center gap-2">
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        value={driverName}
                        onChange={(value) => setDriverName(value)}
                    />
                    <InputField
                        label="Age"
                        type="number"
                        name="age"
                        value={age}
                        onChange={(value) => setAge(value)}
                    />
                    <InputField
                        label="Driving License No"
                        type="text"
                        name="licenseNo"
                        value={driversLicense}
                        onChange={(value) => setDriversLicense(value)}
                    />
                    <InputField
                        label="Phone No"
                        type="tele"
                        name="phoneNo"
                        value={phoneNo}
                        onChange={(value) => setDriversLicense(value)}
                    />
                    <TextArea
                        label="Address"
                        name="driverAddress"
                        value={driverAddress}
                        onChange={(value) => setPhoneNo(value)}
                    />
                </div>
                <Button type="submit" name="Submit" />
            </div>
        </form>
    );

    return <Popup isFormOpen={isFormOpen} content={content} />;
}

DriverEntryForm.propTypes = {
    isFormOpen: PropTypes.bool,
};

export default DriverEntryForm;
