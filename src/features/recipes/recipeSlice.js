import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/api/recipes';
const postUrl = 'http://localhost:5000/api/recipes/create';

export const getAllRecipes = createAsyncThunk('recipes/getAllRecipes', async () => {
    const response = await axios.get(url)
    return response 
})

export const postRecipe = createAsyncThunk('recipes/postRecipe', async (data) => {
    const response = await axios.post(postUrl, data)
    return response
})

const initialState = {
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
        deleteRecipe: (state, action) => {
            const recipeId = action.payload
            state.recipes = state.recipes.filter(recipe => recipe.id !== recipeId)
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
            state.recipes = action.payload.data
        },
        [postRecipe.rejected]: (state) => {
            state.isLoading = false
        },
    }
})

export const { clearRecipes, deleteRecipe } = recipeSlice.actions;
export default recipeSlice.reducer;