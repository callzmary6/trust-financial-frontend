import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import {
  clearAuthData,
  getAccessToken,
  setAccessToken,
  isTokenExpired,
} from '../utils/authUtils';
import Cookies from 'js-cookie';
import '../styles/components/Loader.scss';
import { User } from '../services/apiAuth';

// Structure of the API response
// export interface User {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   createdAt: string;
//   updatedAt: string;
//   refferalCode: string;
// }

export interface LoginResponse {
  success: boolean;
  message: string;
  code: number;
  data: {
    user: User;
  };
  token: string;
}

interface UserDet {
  user: User;
  token: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserDet | null;
  login: (userData: UserDet) => void;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserDet | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = useCallback(() => {
    const token = getAccessToken();
    const userCookie = Cookies.get('user');

    let storedUser: UserDet['user'] | null = null;

    // Safely parse the user cookie
    if (userCookie) {
      try {
        storedUser = JSON.parse(userCookie);
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
      }
    }

    if (token && !isTokenExpired(token) && storedUser) {
      setIsAuthenticated(true);
      setUser({ user: storedUser, token });
    } else {
      logout();
    }
    setLoading(false);
  }, []);

  const login = (userData: UserDet) => {
    console.log(userData)
    setAccessToken(userData.token);
    Cookies.set('user', JSON.stringify(userData?.user), {
      expires: 3,
      secure: true,
      sameSite: 'strict',
    });
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    clearAuthData();
    Cookies.remove('user');
    setIsAuthenticated(false);
    setUser(null);
    // window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="loader">
        <div className="loader__rest auth">
          <div className="loader__rest__shape"></div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, checkAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
