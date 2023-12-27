// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const toggleLogin = (token, userId, username) => {
    console.log(!isAuthenticated);
    setToken(token);
    setUserId(userId);
    setUsername(username);
    setIsAuthenticated(true);
  };
  const toggleLogout = () => {
    console.log(!isAuthenticated);
    setToken(null);
    setUserId(null);
    setUsername(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleLogin, toggleLogout, token, userId, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
