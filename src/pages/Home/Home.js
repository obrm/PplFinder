import Text from "components/Text";
import UserList from "components/UserList";
import * as S from "./style";

const Home = () => {
  return (
    <S.Home>
      <S.Content>
        <S.Header>
          <Text size="64px" bold>
            PplFinder
          </Text>
        </S.Header>
        <UserList />
      </S.Content>
    </S.Home>
  );
};

export default Home;
