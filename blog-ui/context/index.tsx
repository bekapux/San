"use client";
import Cookies from "js-cookie";
import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export function UserWrapper({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function checkAuthentication() {
    const isToken = !!Cookies.get("token");
    setIsAuthenticated(isToken && true);
  }

  checkAuthentication();

  return (
    <UserContext.Provider value={isAuthenticated}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}
