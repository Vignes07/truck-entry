import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEntryFormOpen: false,
    selectedEntry: null,
    formData: []
};

const entryFormSlice = createSlice({
    name: "entryForm",
    initialState,
    reducers: {
        addFormData: (state, action) => {
            const newEntries = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.formData = [...state.formData, ...newEntries];
        },
        toggleEntryForm: (state) => {
            state.isEntryFormOpen = !state.isEntryFormOpen;
        },
        updateFormData: (state, action) => {
            const { key, value } = action.payload;
            state.formData[key] = value;
        },
        resetFormData : (state) => {
            state.formData = []
        },
        setSelectedEntry(state, action) {
            state.selectedEntry = action.payload;
            state.isEntryFormOpen = !!action.payload; // Open the form if entry is selected
        },
    },
});

export const { toggleEntryForm, addFormData, updateFormData, resetFormData, setSelectedEntry } = entryFormSlice.actions;

export default entryFormSlice.reducer;