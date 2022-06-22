import { useState, useEffect } from "react";
import axios from "axios";

export const usePeopleFetch = (page, nationalities) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const nat = nationalities.length === 0 ? "" : nationalities.length > 1 ? nationalities.join(",") : nationalities[0];    
  const natUrl = `&nat=${nat}`;
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
    } else {
      setUsers(oldArray => [...oldArray, ...response.data.results])
    }
  }

  return { users, isLoading, fetchUsers };
};
