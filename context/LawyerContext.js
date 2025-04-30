
// context/LawyerContext.js
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LawyerContext = createContext();

export const LawyerProvider = ({ children }) => {
  const [lawyer, setLawyer] = useState(null);
  const [lawyerLoading, setLawyerLoading] = useState(true);

  const fetchLawyer = async () => {
    try {
      const res = await fetch('/api/lawyer');
      const data = await res.json();
      
      if (res.ok) setLawyer(data.user);
    } catch (err) {
      console.error('Failed to fetch user:', err);
    } finally {
      setLawyerLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyer();
  }, []);

  return (
    <LawyerContext.Provider value={{ lawyer, setLawyer, fetchLawyer, lawyerLoading }}>
      {children}
    </LawyerContext.Provider>
  );
};

export const useLawyer = () => useContext(LawyerContext);
