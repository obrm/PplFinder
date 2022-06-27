import React, { useRef, useEffect, useState } from "react";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import User from "components/User";
import * as S from "./style";
import { usePeopleFetch } from "hooks";
import { NATIONALITIES } from "./constants";

const UserList = () => {
  const [page, setPage] = useState(1);
  const [nationalities, setNationalities] = useState([]);
  const [natUsers, setNatUsers] = useState(null);

  const { users, isLoading } = usePeopleFetch(page, nationalities);

  const listRef = useRef(null);

  useEffect(() => {
    if (nationalities.length) {
      const natUsers = users.filter((user) => nationalities.includes(user.nat));
      setNatUsers(natUsers);
    } else {
      setNatUsers(null);
    }
  }, [nationalities]);

  useEffect(() => {
    if (listRef && listRef.current) {
      const event = listRef.current.addEventListener("scroll", () => {
        if (
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
  }, []);

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
        {natUsers
          ? natUsers.map((user, index) => {
              return <User key={user.email} user={user} index={index} />;
            })
          : users.map((user, index) => {
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
