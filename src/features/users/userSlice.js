import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const users = 'http://localhost:5000/api/users';
const loginUrl = 'http://localhost:5000/api/login';
const signupUrl = 'http://localhost:5000/api/signup';
const approveUrl = 'http://localhost:5000/api/approve';
const deleteUrl = 'http://localhost:5000/api/delete';

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
    const response = await axios.post(loginUrl, data);
    return response;
})

export const signupUser = createAsyncThunk('user/signupUser', async (data) => {
    const response = await axios.post(signupUrl, data);
    return response;
})

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    const response = await axios.get(users);
    return response;
})

export const approveUser = createAsyncThunk('user/approveUser', async (data) => {
    const response = await axios.put(approveUrl, data);
    return response;
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (_id) => {
    console.log(`${deleteUrl}/${_id}`)
    const response = await axios.delete(`${deleteUrl}/${_id}`);
    console.log(response)
    return response;
})

const initialState = {
    user: {},
    users: [],
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
        }
    },
    extraReducers: {
        [loginUser.pending]: (state) => {
            state.isLoading = true
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
            state.isLoading = true
        },
        [signupUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.user = action.payload.data
        },
        [signupUser.rejected]: (state) => {
            state.isLoading = false
        },
        [getAllUsers.pending]: (state) => {
            state.isLoading = true
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.isLoading = false
            state.users = action.payload.data
        },
        [getAllUsers.rejected]: (state) => {
            state.isLoading = false
        },
        [approveUser.pending]: (state) => {
            state.isLoading = true
        },
        [approveUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.users = action.payload.data
        },
        [approveUser.rejected]: (state) => {
            state.isLoading = false
        },
        [deleteUser.pending]: (state) => {
            state.isLoading = true
        },
        [deleteUser.fulfilled]: (state, action) => {
            state.isLoading = false
            state.users = action.payload.data
        },
        [deleteUser.rejected]: (state) => {
            state.isLoading = false
        },
    }
})

export const { getPassword, logOutUser } = userSlice.actions
export default userSlice.reducer;
























