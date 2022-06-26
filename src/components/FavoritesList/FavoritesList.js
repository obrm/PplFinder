import User from "components/User";
import * as S from "./style";

const FavoritesList = ({ favorites , onFavIconClick }) => {

  return (
    <S.FavoritesList>
      <S.List>
        {favorites.length === 0 ? (
          <S.EmptyWrapper>
            <h2>No favorites added</h2>
          </S.EmptyWrapper>
        ) : (
          favorites.map((user, index) => {
            return <User key={user.email} user={user} index={index} onFavIconClick={onFavIconClick} favorites={favorites} />;
          })
        )}
      </S.List>
    </S.FavoritesList>
  );
};

export default FavoritesList;
