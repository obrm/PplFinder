import React from "react";
import User from "components/User";
import * as S from "./style";
import { useFavorites } from "hooks";

const FavoritesList = () => {
  const { favorites } = useFavorites();

  return (
    <S.FavoritesList>
      <S.List>
        {favorites.map((user, index) => {
          return <User key={user.email} user={user} index={index} />;
        })}
      </S.List>
    </S.FavoritesList>
  );
};

export default FavoritesList;
