"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthUser, LoginCredentials } from '../types/admin';
import { authService } from '../services/auth.service';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const clearAuthCookie = () => {
  document.cookie = 'is_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        clearAuthCookie();
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const userData = await authService.me();
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        localStorage.removeItem('access_token');
        clearAuthCookie();
        setUser(null);
        router.replace('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const login = async (credentials: LoginCredentials) => {
    const { user } = await authService.login(credentials);
    setUser(user);
    // Setting a cookie so Next.js middleware knows the user is logged in
    document.cookie = `is_authenticated=true; path=/; max-age=86400; SameSite=Strict`;
    router.push('/admin/dashboard');
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      clearAuthCookie();
      router.push('/admin/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
