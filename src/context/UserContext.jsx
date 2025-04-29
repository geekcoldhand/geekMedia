import React, { createContext, useContext, useState } from "react";

// Create the context
const UserContext = createContext();

// Custom hook for using the context
export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }) {
  const [user, setUser] = useState("");
  
  const value = {
    user,
    setUser
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;