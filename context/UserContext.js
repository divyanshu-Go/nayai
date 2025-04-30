// context/UserContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/user/profile');
      const data = await res.json();
      
      if (res.ok) setUser(data.user);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser, userLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
