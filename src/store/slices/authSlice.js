import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: true,
    login: {
        email: "",
        password: "",
    }
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        setIsLogin: (state) => {
            state.isLogin = !state.isLogin;
        },
        setLogin: (state, action) => {
            state.login = action.payload;
        },
        updateLogin: (state, action) => {
            const { key, value } = action.payload;
            state.login[key] = value;
        },
        resetLogin: (state) => {
            state.login = { email: "", password: "" };
        }
    },
});

export const { setIsLogin, setLogin, updateLogin, resetLogin } = loginSlice.actions;

export default loginSlice.reducer;