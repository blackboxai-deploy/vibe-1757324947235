'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthContextType } from '../../lib/types';
import { AuthService, mockAuth } from '../../lib/auth';
import { toast } from 'sonner';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth on mount
    const checkAuth = () => {
      try {
        const existingUser = AuthService.getUser();
        const token = AuthService.getToken();
        
        if (existingUser && token) {
          setUser(existingUser);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        AuthService.clearAuth();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      const { user: loggedInUser, token } = await mockAuth.login(email, password);
      
      AuthService.setUser(loggedInUser, token);
      setUser(loggedInUser);
      
      toast.success(`Welcome back, ${loggedInUser.name}!`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>): Promise<void> => {
    try {
      setIsLoading(true);
      const { user: newUser, token } = await mockAuth.register({
        name: userData.name || '',
        email: userData.email || '',
        password: '', // This would come from form
        role: userData.role || 'patient',
        phone: userData.phone,
      });
      
      AuthService.setUser(newUser, token);
      setUser(newUser);
      
      toast.success(`Account created successfully! Welcome, ${newUser.name}!`);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await mockAuth.logout();
      AuthService.clearAuth();
      setUser(null);
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      // Clear auth anyway
      AuthService.clearAuth();
      setUser(null);
    }
  };

  const updateProfile = async (userData: Partial<User>): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    try {
      setIsLoading(true);
      const updatedUser = await mockAuth.updateProfile(user.id, userData);
      
      AuthService.setUser(updatedUser, AuthService.getToken() || '');
      setUser(updatedUser);
      
      toast.success('Profile updated successfully');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profile update failed';
      toast.error(message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};