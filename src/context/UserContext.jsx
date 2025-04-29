import React, { createContext, useContext, useState } from "react";


const UserContext = createContext();

export function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
export function UserProvider({ children }) {
    const [user, setUser] = useState("");
    const [projects, setProjects] = useState([]);
  
  const value = {
    user,
    setUser,
    projects,
    setProjects
  };
  
  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;