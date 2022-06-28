import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (pageNumber) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [pageNumber]);

  async function fetchUsers() {    
    setIsLoading(true);
    const url = `https://randomuser.me/api/?results=25&page=${pageNumber}&seed=foobar`;
    const response = await axios.get(url);
    if (pageNumber === 1) {
      setUsers(response.data.results);
    } else {
      setUsers((oldArray) => [...oldArray, ...response.data.results]);
    }
    setIsLoading(false);
  }

  return { users, isLoading };
};
