import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as S from "./style";
import Text from "components/Text";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { toggleFavorite } from "features/favoritesSlice";

const User = ({ user, index, referenced }) => {
  const { favorites } = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const [hoveredUserId, setHoveredUserId] = useState();
  const [isFavorite, setIsFavorite] = useState(false);

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  useEffect(() => {
    setIsFavorite(!!favorites.find((favorite) => favorite.email === user.email));
  }, [favorites]);

  return (
    <S.User
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
      ref={referenced ? referenced : null}
    >
      <S.UserPicture src={user?.picture.large} alt="" />
      <S.UserInfo>
        <Text size="22px" bold>
          {user?.name.title} {user?.name.first} {user?.name.last}
        </Text>
        <Text size="14px">{user?.email}</Text>
        <Text size="14px">
          {user?.location.street.number} {user?.location.street.name}
        </Text>
        <Text size="14px">
          {user?.location.city} {user?.location.country}
        </Text>
      </S.UserInfo>
      <S.IconButtonWrapper
        isVisible={isFavorite ? isFavorite : index === hoveredUserId}
        onClick={() => dispatch(toggleFavorite(user))}
      >
        <IconButton>
          <FavoriteIcon color="error" />
        </IconButton>
      </S.IconButtonWrapper>
    </S.User>
  );
};

export default User;
