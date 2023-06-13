import React, { createContext, useContext, useState } from "react";

export const UserContext = createContext({
  user: null,
  setUserProfile: () => {}
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const setUserProfile = (profile) => {
    setUser(profile);
  };

  return (
    <UserContext.Provider value={{ user, setUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
