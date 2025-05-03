'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const SchemeContext = createContext();

export const SchemeProvider = ({ children }) => {
  const [schemes, setSchemes] = useState([]);
  const [schemesLoading, setSchemesLoading] = useState(true);

  const fetchSchemes = async () => {
    try {
      const res = await axios.get('/api/scheme');
      if (res.status === 200 && res.data?.schemes) {
        setSchemes(res.data.schemes);
      }
    } catch (error) {
      console.error('Failed to fetch schemes:', error);
    } finally {
      setSchemesLoading(false);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, []);

  return (
    <SchemeContext.Provider value={{ schemes, setSchemes, fetchSchemes, schemesLoading }}>
      {children}
    </SchemeContext.Provider>
  );
};

export const useSchemes = () => useContext(SchemeContext);
