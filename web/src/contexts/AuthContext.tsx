import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { logger } from '@/utils/functions';

// Development mode flag - set to false in production
const IS_DEVELOPMENT = import.meta.env.MODE === 'development';

interface UserType {
  id: string | number;
  role: number;
  [key: string]: any;
}

interface AuthContextType {
  user: UserType | null;
  isAuthenticated: boolean;
  login: (token: string, userData: UserType) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check for existing auth on initial load
  useEffect(() => {
    const checkAuth = () => {
      try {
        // In development mode, auto-login with test user if not already logged in
        if (IS_DEVELOPMENT && !localStorage.getItem('authToken')) {
          const testUser = {
            id: 1,
            role: 1,
            username: 'devuser',
            email: 'dev@example.com'
          };
          localStorage.setItem('authToken', 'dev-auth-token');
          localStorage.setItem('user', JSON.stringify(testUser));
          setUser(testUser);
          setIsAuthenticated(true);
          logger.log('Development mode: Auto-logged in as test user');
        } else {
          const token = localStorage.getItem('authToken');
          const userData = localStorage.getItem('user');
          
          if (token && userData) {
            setUser(JSON.parse(userData));
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        logger.error('Error checking auth status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string, userData: UserType) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    navigate('/signin');
  };

  if (isLoading) {
    return <div>Loading...</div>; // Or your loading component
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
