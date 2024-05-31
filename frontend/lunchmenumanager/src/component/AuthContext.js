import React, { createContext, useContext, useState } from 'react';
import AuthService from './AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!AuthService.getToken());
  const [role, setRole] = useState(AuthService.getRole());

  const handleLogin = () => {
    setIsLoggedIn(true);
    setRole(AuthService.getRole());
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setRole(null);
  };

  const getToken = () => {
    return AuthService.getToken();
  };

  const getRole = () => {
    return AuthService.getRole();
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, handleLogin, handleLogout, getToken, getRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;