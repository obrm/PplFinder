import React from "react";
import Text from "components/Text";
import * as S from "./style";
import FavoritesList from "components/FavoritesList";

const Favorites = ({favorites, onFavIconClick}) => {
  return (
    <S.Favorites>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            Favorites
          </Text>
        </S.Header>
        <FavoritesList favorites={favorites} onFavIconClick={onFavIconClick} />
      </S.Content>
    </S.Favorites>
  );
};

export default Favorites;
