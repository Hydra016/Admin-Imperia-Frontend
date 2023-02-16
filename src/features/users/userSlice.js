import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const loginUrl = 'http://localhost:5000/api/login';
const signupUrl = 'http://localhost:5000/api/signup';

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
    const response = await axios.post(loginUrl, data);
    return response;
})

export const signupUser = createAsyncThunk('user/signupUser', async (data) => {
    const response = await axios.post(signupUrl, data);
    return response;
})

const initialState = {
    user: {},
    isLoggedIn: false,
    isLoading: true
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOutUser: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            state.isLoading = false;
        },
        getPassword: (state, action) => {
            const password = action.payload
            console.log(password)
        }
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = false
        },
        [loginUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload.data
            state.isLoggedIn = action.payload.data.isLoggedIn
        },
        [loginUser.rejected]: (state) => {
            state.isLoading = false
        },
        [signupUser.pending]: (state) => {
            state.isLoading = false
        },
        [signupUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload.data
        },
        [signupUser.rejected]: (state) => {
            state.isLoading = false
        },
    }
})

export const { getPassword, logOutUser } = userSlice.actions
export default userSlice.reducer;
























