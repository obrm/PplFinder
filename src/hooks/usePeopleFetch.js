import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (pageNumber, nationalities) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const url = `https://randomuser.me/api/?results=25&page=${pageNumber}&seed=foobar`;

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  async function fetchUsers() {
    if (nationalities.length) {
      return
    }
    setIsLoading(true);
    const response = await axios.get(url);
    if (pageNumber === 1) {      
      setUsers(response.data.results);
    } else {
      setUsers((oldArray) => [...oldArray, ...response.data.results]);
    }
    setIsLoading(false);
  }

  return { users, isLoading, fetchUsers };
};
