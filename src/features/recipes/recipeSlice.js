import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'https://admin-imperia-backend-production.up.railway.app/api/recipes';
// const postUrl = 'http://localhost:5000/api/recipes/create';

export const getAllRecipes = createAsyncThunk('recipes/getAllRecipes', async () => {
    const response = await axios.get(url)
    return response 
})

export const updateRecipe = createAsyncThunk('recipes/updateRecipe', async (id, data) => {
    console.log(data.data.data)
    const response = await axios.put(`${url}/${id}`, data.data.data)
    console.log(response)
    return response
})

export const getSingleRecipe = createAsyncThunk(`recipes/getSingleRecipe`, async (id) => {
    const response = await axios.get(`${url}/${id}`)
    return response 
})

export const getRecipeById = createAsyncThunk(`recipes/getRecipeById`, async (id) => {
    const response = await axios.get(`${url}/myRecipes/${id}`)
    return response 
})

export const deleteRecipe = createAsyncThunk(`recipes/deleteRecipe`, async (data) => {
    const { id, userId } = data
    const response = await axios.delete(`${url}/query?id=${id}&userId=${userId}`);
    return response 
})

export const postRecipe = createAsyncThunk('recipes/postRecipe', async (data) => {
    const response = await axios.post(`${url}/create`, data)
    return response
})

const initialState = {
    recipe: {},
    recipes: [],
    count: 0,
    isLoading: true
}

const recipeSlice = createSlice({
    name: 'recipe',
    initialState,
    reducers: {
        clearRecipes: (state) => {
            state.recipes = [];
        },
    },
    extraReducers: {
        [getAllRecipes.pending]: (state) => {
            state.isLoading = true
        },
        [getAllRecipes.fulfilled]: (state, action) => {
            state.isLoading = false
            state.recipes = action.payload.data
        },
        [getAllRecipes.rejected]: (state) => {
            state.isLoading = false
        },
        [postRecipe.pending]: (state) => {
            state.isLoading = true
        },
        [postRecipe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.recipe = action.payload.data
        },
        [postRecipe.rejected]: (state) => {
            state.isLoading = false
        },
        [getSingleRecipe.pending]: (state) => {
            state.isLoading = true
        },
        [getSingleRecipe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.recipe = action.payload.data
        },
        [getSingleRecipe.rejected]: (state) => {
            state.isLoading = false
        },
        [getRecipeById.pending]: (state) => {
            state.isLoading = true
        },
        [getRecipeById.fulfilled]: (state, action) => {
            state.isLoading = false
            state.recipes = action.payload.data
        },
        [getRecipeById.rejected]: (state) => {
            state.isLoading = false
        },
        [deleteRecipe.pending]: (state) => {
            state.isLoading = true
        },
        [deleteRecipe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.recipes = action.payload.data
        },
        [deleteRecipe.rejected]: (state) => {
            state.isLoading = false
        },
        [updateRecipe.pending]: (state) => {
            state.isLoading = true
        },
        [updateRecipe.fulfilled]: (state, action) => {
            state.isLoading = false
            state.recipe = action.payload.data
        },
        [updateRecipe.rejected]: (state) => {
            state.isLoading = false
        },
    }
})

export const { clearRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;