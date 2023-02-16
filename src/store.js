import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from './features/recipes/recipeSlice';
import userReducer from './features/users/userSlice';

export const store = configureStore({
    reducer: {
        recipe: recipeReducer,
        user: userReducer
    }
})