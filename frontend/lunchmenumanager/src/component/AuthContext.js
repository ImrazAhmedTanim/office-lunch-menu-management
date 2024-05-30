import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};