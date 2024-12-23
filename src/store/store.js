import { configureStore } from "@reduxjs/toolkit";
import entryFormReducer from "./slices/entryFormSlice";
import adminProfileReducer from "./slices/adminProfileSlice";
import loginReducer from "./slices/authSlice.js"
import loadingReducer from "./slices/loadingSlice.js"
import driverFormReducer from "./slices/driverFormSlice.js"

const store = configureStore({
    reducer: {
        loading: loadingReducer,
        entryForm: entryFormReducer,
        adminProfile: adminProfileReducer,
        login: loginReducer,
        driverForm: driverFormReducer
    },
});

export default store;
