import { useState, useEffect } from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Favorites, Home } from "pages";
import { ThemeProvider } from "theme";
import NavBar from "components/NavBar";

const AppRouter = () => {
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

  return (
    <ThemeProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/" >
            <Home favorites={favorites} onFavIconClick={onFavIconClick}/>
          </Route>
          <Route exact path="/favorites">
            <Favorites favorites={favorites} onFavIconClick={onFavIconClick} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default AppRouter;
