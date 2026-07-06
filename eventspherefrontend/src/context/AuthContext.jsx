import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { getToken, getUser, setAuth, clearAuth } from '../utils/storage';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getUser());
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(Boolean(getToken()));

  const isAuthenticated = Boolean(token);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = getToken();
      if (!storedToken) {
        setIsInitializing(false);
        return;
      }

      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
        setAuth(storedToken, currentUser);
      } catch {
        clearAuth();
        setToken(null);
        setUser(null);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback((authToken, userData) => {
    setAuth(authToken, userData);
    setToken(authToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((userData) => {
    setAuth(token, userData);
    setUser(userData);
  }, [token]);

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated,
      isLoading,
      isInitializing,
      setIsLoading,
      login,
      logout,
      updateUser,
      isAdmin: user?.role === 'ADMIN',
      isUser: user?.role === 'USER',
    }),
    [token, user, isAuthenticated, isLoading, isInitializing, login, logout, updateUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
