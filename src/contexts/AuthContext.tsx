import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User } from '../types/auth';

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initialize with some default users
const defaultUsers = {
  student: { username: 'student', password: 'student123', role: 'student' },
  staff: { username: 'staff', password: 'staff123', role: 'staff' }
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>(() => {
    const savedAuth = localStorage.getItem('zadi_auth');
    return savedAuth 
      ? JSON.parse(savedAuth)
      : { user: null, isAuthenticated: false };
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    // Check if username exists in default users
    const user = defaultUsers[username as keyof typeof defaultUsers];
    
    if (user && user.password === password) {
      const userData: User = {
        username: user.username,
        role: user.role,
      };
      const newAuthState = { user: userData, isAuthenticated: true };
      setAuthState(newAuthState);
      localStorage.setItem('zadi_auth', JSON.stringify(newAuthState));
      return true;
    }
    return false;
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    // For now, registration is not supported
    return false;
  };

  const logout = () => {
    setAuthState({ user: null, isAuthenticated: false });
    localStorage.removeItem('zadi_auth');
    localStorage.removeItem('preferredName');
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}