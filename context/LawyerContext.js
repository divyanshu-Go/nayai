// context/LawyerContext.js
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const LawyerContext = createContext();

export const LawyerProvider = ({ children }) => {
  const [lawyers, setlawyers] = useState(null);
  const [loggedinLawyer, setLoggedinLawyer] = useState(null);
  const [lawyerLoading, setLawyerLoading] = useState(true);

  const fetchLawyers = async () => {
    try {
      const res = await fetch("/api/lawyer");
      const data = await res.json();

      if (res.ok) setlawyers(data.lawyers);
    } catch (err) {
      console.error("Failed to fetch lawyers:", err);
    }
  };

  const fetchLoggedinLawyer = async () => {
    try {
      const res = await fetch("/api/lawyer/profile");
      const data = await res.json();
      if (res.ok) setLoggedinLawyer(data.lawyer);
      else setLoggedinLawyer(null);
    } catch (err) {
      console.error("Failed to fetch logged-in lawyer:", err);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLawyerLoading(true); 
      await fetchLawyers();
      await fetchLoggedinLawyer();
      setLawyerLoading(false);
    };
  
    fetchAll();
  }, []);
  

  return (
    <LawyerContext.Provider
      value={{
        lawyers,
        setlawyers,
        fetchLawyers,
        loggedinLawyer,
        fetchLoggedinLawyer,
        lawyerLoading,
      }}
    >
      {children}
    </LawyerContext.Provider>
  );
};

export const useLawyer = () => useContext(LawyerContext);
