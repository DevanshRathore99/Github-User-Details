"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserData {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface UserContextType {
  userData: UserData | null;
  setUserData: (user: UserData | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserDataState] = useState<UserData | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("userData");
    if (storedData) {
      setUserDataState(JSON.parse(storedData));
    }
  }, []);

  // Save to localStorage on update
  const setUserData = (user: UserData | null) => {
    setUserDataState(user);
    if (user) {
      localStorage.setItem("userData", JSON.stringify(user));
    } else {
      localStorage.removeItem("userData");
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
