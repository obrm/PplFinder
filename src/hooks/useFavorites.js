import { useState, useEffect } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
    setFavorites(favoritesFromStorage);
  }, []);

  const onFavIconClick = (user) => {
    const isFavorite = !!favorites.find((favorite) => favorite.email === user.email);
    if (!isFavorite) {      
      const newFavorites = [...favorites, user];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } else {
      const newFavorites = JSON.parse(localStorage.getItem("favorites")).filter(
        (favorite) => favorite.email !== user.email
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    }
  };

  return { favorites, onFavIconClick };
}