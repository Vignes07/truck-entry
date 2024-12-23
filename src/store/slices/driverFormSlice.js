import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDriverFormOpen: false,
    driverData: []
};

const driverFormSlice = createSlice({
    name: "driverForm",
    initialState,
    reducers: {
        addDriver: (state, action) => {
            const newEntries = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.driverData = [...state.driverData, ...newEntries];
        },
        setDriverData: (state, action) => {
            state.driverData = action.payload;
        },
        toggleDriverForm(state) {
            state.isDriverFormOpen = !state.isDriverFormOpen;
        }
    },
});

export const { toggleDriverForm, addDriver, setDriverData } = driverFormSlice.actions;

export default driverFormSlice.reducer;
