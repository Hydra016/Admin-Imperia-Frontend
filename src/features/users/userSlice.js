import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const root = 'http://localhost:5000/api'

export const loginUser = createAsyncThunk('user/loginUser', async (data) => {
    const response = await axios.post(`${root}/login`, data)
    return response;
})

export const signupUser = createAsyncThunk('user/signupUser', async (data) => {
    const response = await axios.post(`${root}/signup`, data);
    return response;
})

export const getAllUsers = createAsyncThunk('user/getAllUsers', async () => {
    const response = await axios.get(`${root}/users`);
    return response;
})

export const approveUser = createAsyncThunk('user/approveUser', async (data) => {
    const response = await axios.put(`${root}/approve`, data);
    return response;
})

export const deleteUser = createAsyncThunk('user/deleteUser', async (_id) => {
    const response = await axios.delete(`${root}/delete/${_id}`);
    return response;
})


//not confirmed
// export const getSingleUser = createAsyncThunk('user/getSingleUser', async (_id) => {
//     const response = await axios.get(`${root}/singleUser/${_id}`);
//     return response;
// })

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
























