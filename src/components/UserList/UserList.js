import React, { useRef, useEffect, useState, useCallback } from "react";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import User from "components/User";
import * as S from "./style";
import { usePeopleFetch } from "hooks";
import { NATIONALITIES } from "./constants";

const UserList = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [nationalities, setNationalities] = useState([]);
  const [nationalitiesUsers, setNationalitiesUsers] = useState(null);

  const { users, isLoading } = usePeopleFetch(pageNumber);

  const listRef = useRef(null);

  useEffect(() => {
    if (nationalities.length) {
      const natUsers = users.filter((user) => nationalities.includes(user.nat));
      setNationalitiesUsers(natUsers);
    } else {
      setNationalitiesUsers(null);
    }
  }, [nationalities]);

  const observer = useRef();
  const lastUserElementRef = useCallback(
    (lastUserNode) => {
      // Do not make a new API call if still loading
      if (isLoading) return;
      // If observer.current is not null, disconnect observer from previous user node in order to hook the new last user node correctly
      if (observer.current) observer.current.disconnect();
      // Set an IntersectionObserver to check if the lastUserNode that we are observing is intersecting, e.g. It is visible on the page,
      // then it means that we are at the end of list and we should make a new call to the API
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      // If there is a lastUserElement, we make sure the observer is observing our lastUserElement
      if (lastUserNode) observer.current.observe(lastUserNode);
    },
    [isLoading]
  );

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
        {nationalitiesUsers
          ? nationalitiesUsers.map((user, index) => {
              return <User key={user.email} user={user} index={index} />;
            })
          : users.map((user, index) => {
              // Is this the last element in users array?
              if (users.length === index + 1) {
                return (
                  <User
                    referenced={lastUserElementRef}
                    key={user.email}
                    user={user}
                    index={index}
                  />
                );
              } else {
                return <User key={user.email} user={user} index={index} />;
              }
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
