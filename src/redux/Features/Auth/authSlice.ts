import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthSlice } from "../../../Types";
import { useDispatch } from "react-redux";

const initialState: AuthSlice = {
    isLoading: false,
    error: null,
    userId: null,
    token: localStorage.getItem("token"),
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginRequest: (state) => {
            state.isLoading = true;
            state.error = null
        },

        loginSuccess: (state, action: PayloadAction<{userId: string; token: string}>) => {
            state.isLoading = false;
            state.token = action.payload.token;
            state.userId = parseInt(action.payload.userId);
            localStorage.setItem('token', JSON.stringify(action.payload.token));
            localStorage.setItem("id", action.payload.userId);
        },
        loginFaliure: (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        },
        logout: (state) => {
            state.isLoading = false;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
        },
    }
})

export const {loginRequest, loginSuccess, loginFaliure, logout} = authSlice.actions;
export default authSlice.reducer;