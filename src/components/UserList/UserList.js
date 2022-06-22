import React, { useRef, useState, useEffect } from "react";
import Text from "components/Text";
import Spinner from "components/Spinner";
import CheckBox from "components/CheckBox";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import * as S from "./style";
import { NATIONALITIES } from "./constants";

const UserList = ({ users, isLoading, nationalities, setNationalities, setPage }) => {
  const [hoveredUserId, setHoveredUserId] = useState();
  const listRef = useRef(null);

  
  useEffect(() => {
    if (listRef && listRef.current) {      
      const event = listRef.current.addEventListener('scroll', () => {           
        if (
          !isLoading &&
          // clientHeight = the height of an element + the vertical padding.          
          // scrollHeight = the height of element's content (including the content which isn't visible on the screen) + the vertical padding.
          listRef.current.scrollTop >= listRef.current.scrollHeight - listRef.current.clientHeight
        ) {
          setPage((oldValue) => {
            return oldValue + 1
          })
        }
      })

      return () => {
        listRef.current.removeEventListener('scroll', event)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleMouseEnter = (index) => {
    setHoveredUserId(index);
  };

  const handleMouseLeave = () => {
    setHoveredUserId();
  };

  const handleCheckBoxClick = (value) => {   
    if (nationalities.includes(value)) {
      setNationalities(nationalities.filter(nationality => nationality !== value));
    } else {
      setNationalities(oldArray => [...oldArray, value]);
    }
  }

  return (
    <S.UserList>
      <S.Filters>
        {NATIONALITIES.map((nationality) => (
        <CheckBox key={nationality.id} {...nationality} handleCheckBoxClick={handleCheckBoxClick} />
        ))}
      </S.Filters>
      <S.List ref={listRef} >
        {users.map((user, index) => {
          return (
            <S.User
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
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
              <S.IconButtonWrapper isVisible={index === hoveredUserId}>
                <IconButton>
                  <FavoriteIcon color="error" />
                </IconButton>
              </S.IconButtonWrapper>
            </S.User>
          );
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
