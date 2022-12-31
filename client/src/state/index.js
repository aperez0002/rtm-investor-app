import { createSlice } from "@reduxjs/toolkit";

// initialize userToken from local storage
const userToken = localStorage.getItem('userToken')
    ? localStorage.getItem('userToken')
    : null

const initialState = {
    loading: false,
    userInfo: null,
    userToken,
    error: null,
    success: false,
    mode: "dark",
    // userId: "63701cc1f03239b7f700000e" // need to come back and set this with login!
};

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? "dark" : 'light';
        },
    }
})

export const { setMode } = globalSlice.actions;

export default globalSlice.reducer;