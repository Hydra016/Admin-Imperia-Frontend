import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    lang: "en"
}

const commonSlice = createSlice({
    name: 'common',
    initialState,
    reducers: {
        setLang: (state, action) => {
            state.lang = action.payload
        }
    }
})

export const { setLang } = commonSlice.actions;
export default commonSlice.reducer;