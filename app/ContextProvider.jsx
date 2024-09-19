"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { refresh } from "@/api";

const GlobalContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(true);
      const fetchedUser = await refresh();
      setUser(fetchedUser || null);
      setLoading(false);
    })();
  }, []);

  return (
    <GlobalContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextProvider;

export const useGlobalContext = () => useContext(GlobalContext);
