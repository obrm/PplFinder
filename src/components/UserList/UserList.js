import React, { useRef, useEffect, useState } from "react";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import User from "components/User";
import * as S from "./style";
import { NATIONALITIES } from "./constants";

const UserList = ({ users, isLoading, handleCheckBoxClick, setPage }) => {
  const [favorites, setFavorites] = useState([]);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef && listRef.current) {
      const event = listRef.current.addEventListener("scroll", () => {
        if (
          !isLoading &&
          // clientHeight = the height of an element + the vertical padding.
          // scrollHeight = the height of element's content (including the content which isn't visible on the screen) + the vertical padding.
          listRef.current.scrollTop >=
            listRef.current.scrollHeight - listRef.current.clientHeight
        ) {
          setPage((oldValue) => {
            return oldValue + 1;
          });
        }
      });

      return () => {
        listRef.current.removeEventListener("scroll", event);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const favoritesFromStorage = localStorage.getItem("favorites")
      ? JSON.parse(localStorage.getItem("favorites"))
      : [];
    setFavorites(favoritesFromStorage);
  }, []);

  const onFavIconClick = (email) => {
    const isFavorite = !!favorites.find((favorite) => favorite.email === email);
    if (!isFavorite) {
      const user = users.find((user) => user.email === email);      
      const newFavorites = [...favorites, user];
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } else {
      const newFavorites = JSON.parse(localStorage.getItem("favorites")).filter(
        (favorite) => favorite.email !== email
      );
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    }
  };

  return (
    <S.UserList>
      <S.Filters>
        {NATIONALITIES.map((nationality) => (
          <CheckBox
            key={nationality.id}
            {...nationality}
            handleCheckBoxClick={handleCheckBoxClick}
          />
        ))}
      </S.Filters>
      <S.List ref={listRef}>
        {users.map((user, index) => {
          return (
            <User
              key={user.email}
              user={user}
              index={index}
              favorites={favorites}
              onFavIconClick={onFavIconClick}
            />
          );
        })}
        {isLoading && (
          <S.SpinnerWrapper>
            <Spinner color="primary" size="45px" thickness={6} variant="indeterminate" />
          </S.SpinnerWrapper>
        )}
      </S.List>
    </S.UserList>
  );
};

export default UserList;
