import { configureStore } from "@reduxjs/toolkit";
import recipeReducer from './features/recipes/recipeSlice';
import userReducer from './features/users/userSlice';
import commonReducer from './features/common/commonSlice';

export const store = configureStore({
    reducer: {
        recipe: recipeReducer,
        user: userReducer,
        common: commonReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})