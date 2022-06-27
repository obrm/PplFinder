import React, { useRef, useEffect, useState } from "react";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import User from "components/User";
import * as S from "./style";
import { usePeopleFetch } from "hooks";
import { NATIONALITIES } from "./constants";

const UserList = () => {
  const [nationalities, setNationalities] = useState([]);
  const [page, setPage] = useState(1);
  const listRef = useRef(null);

  const { users, isLoading } = usePeopleFetch(page, nationalities);

  useEffect(() => {
    if (listRef && listRef.current) {
      const event = listRef.current.addEventListener("scroll", () => {
        if (
          // clientHeight = the height of an element + the vertical padding.
          // scrollHeight = the height of element's content (including the content which isn't visible on the screen) + the vertical padding.
          !isLoading &&
          listRef.current.scrollTop >=
            listRef.current.scrollHeight - listRef.current.clientHeight
        ) {
          setPage((oldValue) => {
            return oldValue + 1;
          });
        }
      });

      return () => {
        if (listRef.current) {
          listRef.current.removeEventListener("scroll", event);
        }
      };
    }
  }, [isLoading]);

  const handleCheckBoxClick = (value) => {
    if (nationalities.includes(value)) {
      setNationalities(nationalities.filter((nationality) => nationality !== value));
    } else {
      setNationalities((oldArray) => [...oldArray, value]);
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
          return <User key={user.email} user={user} index={index} />;
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
