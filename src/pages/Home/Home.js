import React, { useState, useEffect } from "react";
import Text from "components/Text";
import UserList from "components/UserList";
import { usePeopleFetch } from "hooks";
import * as S from "./style";

const Home = () => {
  const [nationalities, setNationalities] = useState([])
  const [page, setPage] = useState(1)

  const { users, isLoading } = usePeopleFetch(page , nationalities);

  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList users={users} isLoading={isLoading} setNationalities={setNationalities} nationalities={nationalities} setPage={setPage} />
      </S.Content>
    </S.Home>
  );
};

export default Home;
