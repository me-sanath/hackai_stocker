import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);

  const toggleLogin = (token, userId, username, callback) => {
    setToken(token);
    setUserId(userId);
    setUsername(username);
    setIsAuthenticated(true);
    callback();
  };

  const toggleLogout = (callback) => {
    setToken(null);
    setUserId(null);
    setUsername(null);
    setIsAuthenticated(false);
    callback();
  };

  useEffect(() => {
    // This effect will run after the state is updated
    console.log(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleLogin, toggleLogout, token, userId, username }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
