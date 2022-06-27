import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "features/favoritesSlice";

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer
    }
})