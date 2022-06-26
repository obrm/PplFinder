import React, { useState } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = ({ favorites, onFavIconClick }) => {
  const [nationalities, setNationalities] = useState([]);
  const [page, setPage] = useState(1);

  const { users, isLoading } = usePeopleFetch(page, nationalities);

  const handleCheckBoxClick = (value) => {
    if (nationalities.includes(value)) {
      setNationalities(nationalities.filter((nationality) => nationality !== value));
    } else {
      setNationalities((oldArray) => [...oldArray, value]);
    }
  };

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList
          users={users}
          isLoading={isLoading}
          handleCheckBoxClick={handleCheckBoxClick}
          nationalities={nationalities}
          setPage={setPage}
          favorites={favorites}
          onFavIconClick={onFavIconClick}
        />
      </S.Content>
    </S.Home>
  );
};

export default Home;
