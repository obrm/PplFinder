import { createSlice } from "@reduxjs/toolkit";

const favoritesFromStorage = localStorage.getItem("favorites")
  ? JSON.parse(localStorage.getItem("favorites"))
  : [];

const initialState = {
  favorites: favoritesFromStorage,
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const isFavorite = !!state.favorites.find(
        (favorite) => favorite.email === action.payload.email
      );
      if (!isFavorite) {
        const newFavorites = [...state.favorites, action.payload];
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        state.favorites = newFavorites;
      } else {
        const newFavorites = JSON.parse(localStorage.getItem("favorites")).filter(
          (favorite) => favorite.email !== action.payload.email
          );
        localStorage.setItem("favorites", JSON.stringify(newFavorites));
        state.favorites = newFavorites
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions

export default favoritesSlice.reducer