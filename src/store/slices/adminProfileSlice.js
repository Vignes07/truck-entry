import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAdminProfileOpen: false,
    isAdminProfileEditable: false,
    profileData: {
        profilePic: "",
        name: "",
        companyName: "",
        GSTIN: "",
        PAN: "",
        SACCode: "",
    },
};

const adminProfileSlice = createSlice({
    name: "adminProfile",
    initialState,
    reducers: {
        toggleAdminProfile(state) {
            state.isAdminProfileOpen = !state.isAdminProfileOpen;
        },
        toggleAdminProfileEditable(state) {
            state.isAdminProfileEditable = !state.isAdminProfileEditable;
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload;
        },
        updateProfileData: (state, action) => {
            const { key, value } = action.payload;
            state.profileData[key] = value;
        },
    },
});

export const { toggleAdminProfile, setProfileData,updateProfileData,toggleAdminProfileEditable } = adminProfileSlice.actions;

export default adminProfileSlice.reducer;
