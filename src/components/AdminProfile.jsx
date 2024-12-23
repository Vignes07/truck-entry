import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.js";
import Popup from "./Popup.jsx";
import InputField from "./InputField.jsx";
import { CircleX, Edit2 } from "lucide-react";
import PropTypes from "prop-types";
import Button from "./Button.jsx";
import { setProfileData, toggleAdminProfile, toggleAdminProfileEditable } from "../store/slices/adminProfileSlice.js";
import { resetLogin } from "../store/slices/authSlice.js";
import { useNavigate } from "react-router-dom";
import {resetFormData} from "../store/slices/entryFormSlice.js";

function AdminProfile({ profileData, isFormOpen, isEditable }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [editedData, setEditedData] = useState({
        name: profileData.name || '',
        companyName: profileData.companyName || '',
        GSTIN: profileData.GSTIN || '',
        PAN: profileData.PAN || '',
        SACCode: profileData.SACCode || '',
        profilePic: profileData.profilePic || '',
    });

    useEffect(() => {
        setEditedData(prev => ({
            ...prev,
            name: profileData.name || '',
            companyName: profileData.companyName || '',
            GSTIN: profileData.GSTIN || '',
            PAN: profileData.PAN || '',
            SACCode: profileData.SACCode || '',
            profilePic: profileData.profilePic || '',
        }));
    }, [profileData]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setEditedData(prev => ({ ...prev, profilePic: reader.result }));
            } else {
                console.log("FileReader result is not a string.");
            }
        };
        reader.onerror = () => {
            console.log("Error reading the file.");
        };
        reader.readAsDataURL(file);
    };

    const handleLogout = () => {
        document.cookie = "authToken=; path=/; Secure; HttpOnly; SameSite=Strict;";
        dispatch(toggleAdminProfile());
        dispatch(resetLogin());
        dispatch(resetFormData())
        navigate("/login");
        auth.signOut();
    };

    const handleSave = async () => {
        const user = auth.currentUser;
        if (user) {
            const userDoc = doc(db, "users", user.uid);

            try {
                const userSnapshot = await getDoc(userDoc);
                if (userSnapshot.exists()) {
                    await updateDoc(userDoc, {
                        name: editedData.name,
                        companyName: editedData.companyName,
                        GSTIN: editedData.GSTIN,
                        PAN: editedData.PAN,
                        SACCode: editedData.SACCode,
                        profilePic: editedData.profilePic,
                    });
                    console.log("User data updated");

                    dispatch(setProfileData(editedData));
                } else {
                    await setDoc(userDoc, editedData);
                    console.log("New user created");
                    dispatch(setProfileData(editedData));
                }
                dispatch(toggleAdminProfileEditable());
            } catch (error) {
                console.log("Error saving user data: " + error.message);
            }
        } else {
            console.log("No user is logged in.");
        }
    };

    const content = (
        <div className="drop-shadow-2xl h-fit w-max bg-white rounded z-999 overflow-auto p-10">
            <h1 className="text-2xl font-extrabold text-[#636ae8]">Admin Profile</h1>
            <CircleX
                className="absolute top-10 right-10 cursor-pointer text-[#636ae8]"
                onClick={() => dispatch(toggleAdminProfile())}
            />
            <div className="flex flex-col justify-between items-center gap-4 m-2">
                <div className="relative">
                    <img
                        className="object-cover w-24 h-24 rounded-full mt-4"
                        src={editedData.profilePic || "https://s3.amazonaws.com/37assets/svn/765-default-avatar.png"}
                        alt="Profile picture"
                    />
                    {isEditable && (
                        <label
                            htmlFor="file-upload"
                            className="absolute bottom-0 w-24 h-24 flex items-center justify-center bg-gray-300 bg-opacity-40 rounded-full opacity cursor-pointer"
                        >
                            <Edit2 className="text-white w-5 h-6" />
                        </label>
                    )}
                    <input
                        id="file-upload"
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>

                <div className="flex flex-col justify-between items-center gap-1">
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        isDisabled={!isEditable}
                        value={editedData.name}
                        onChange={(value) => setEditedData(prev => ({ ...prev, name: value }))}
                    />
                    <InputField
                        label="Company Name"
                        type="text"
                        name="companyName"
                        isDisabled={!isEditable}
                        value={editedData.companyName}
                        onChange={(value) => setEditedData(prev => ({ ...prev, companyName: value }))}
                    />
                    <InputField
                        label="GSTIN"
                        type="text"
                        name="gstin"
                        isDisabled={!isEditable}
                        value={editedData.GSTIN}
                        onChange={(value) => setEditedData(prev => ({ ...prev, GSTIN: value }))}
                    />
                    <InputField
                        label="PAN"
                        type="text"
                        name="pan"
                        isDisabled={!isEditable}
                        value={editedData.PAN}
                        onChange={(value) => setEditedData(prev => ({ ...prev, PAN: value }))}
                    />
                    <InputField
                        label="SAC Code"
                        type="text"
                        name="sacCode"
                        isDisabled={!isEditable}
                        value={editedData.SACCode}
                        onChange={(value) => setEditedData(prev => ({ ...prev, SACCode: value }))}
                    />
                </div>

                <div className="flex flex-col justify-between w-full items-center gap-2">
                    <Button
                        type="button"
                        name={`${isEditable ? "Save" : "Edit"}`}
                        styles="ml-0 border-2 border-[#636ae8] !text-[#636ae8] bg-white w-full"
                        onClick={() => {
                            if (isEditable) {
                                handleSave();
                            } else {
                                dispatch(toggleAdminProfileEditable());
                            }
                        }}
                    />
                    <Button type="button" name="Logout" styles="ml-0 w-full" onClick={handleLogout} />
                </div>
            </div>
        </div>
    );

    return <Popup isFormOpen={isFormOpen} content={content} />;
}

AdminProfile.propTypes = {
    profileData: PropTypes.object,
    isFormOpen: PropTypes.bool,
    isEditable: PropTypes.bool,
    handleUpdate: PropTypes.func,
};

export default AdminProfile;
