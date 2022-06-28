import { useSelector } from "react-redux";
import User from "components/User";
import * as S from "./style";
import Text from "components/Text";

const FavoritesList = () => {
  const { favorites } = useSelector((state) => state.favorites);

  return (
    <S.FavoritesList>
      <S.List>
        {!favorites.length ? (
          <S.EmptyWrapper>
            <Text size="34px">
              No favorites added
            </Text>
          </S.EmptyWrapper>
        ) : (
          favorites.map((user, index) => {
            return <User key={user.email} user={user} index={index} />;
          })
        )}
      </S.List>
    </S.FavoritesList>
  );
};

export default FavoritesList;
