import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (page, nationalities) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let nat = "";
  if (nationalities.length === 1) {
    nat = nationalities[0];
  } else if (nationalities.length > 1) {
    nat = nationalities.join(",");
  }
  const natUrl = !!nat ? `&nat=${nat}` : "";
  const url = `https://randomuser.me/api/?results=25&page=${page}&seed=foobar${natUrl}`;

  useEffect(() => {
    fetchUsers();
  }, [nationalities, page]);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(url);
    setIsLoading(false);
    if (page === 1) {
      setUsers(response.data.results);
    } else if (nationalities.length > 0 && page !== 1) {
      const natUsers = users.filter((user) => nationalities.includes(user.nat))
      setUsers([...natUsers, ...response.data.results]);
    } else {
      setUsers((oldArray) => [...oldArray, ...response.data.results]);
    }
  }

  return { users, isLoading, fetchUsers };
};
