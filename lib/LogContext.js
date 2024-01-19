"use client";
import { createContext, useContext, useRef } from "react";

export const LogContext = createContext();

export const LogProvider = ({ children }) => {
  const logsCollectionRef = useRef(null);

  const setLogsCollectionRef = (ref) => {
    logsCollectionRef.current = ref;
  };

  return (
    <LogContext.Provider value={{ logsCollectionRef, setLogsCollectionRef }}>
      {children}
    </LogContext.Provider>
  );
};

export const useLogsCollectionRef = () => {
  const context = useContext(LogContext);

  if (!context) {
    throw new Error("useLogsCollectionRef must be used within a provider");
  }
  return context;
};
