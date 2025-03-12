import React, { createContext, useContext, useEffect, useState } from 'react';
import { initializeGoogleSignIn } from '../config/google-config';
import { useGoogleSignInState, checkPreviousSignIn, getCurrentUser, signIn, signOut, revokeAccess } from '../config/signin';
import { User } from '@react-native-google-signin/google-signin';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  hasPreviousSignIn: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  revokeAccess: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const {
    userInfo,
    setUserInfo,
    hasPreviousSignIn,
    setHasPreviousSignIn
  } = useGoogleSignInState();

  useEffect(() => {
    // Initialize Google Sign-In when the provider mounts
    const initAuth = async () => {
      try {
        setIsLoading(true);
        initializeGoogleSignIn();
        await checkPreviousSignIn(setHasPreviousSignIn);
        if (hasPreviousSignIn) {
          await getCurrentUser(setUserInfo);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const value = {
    user: userInfo,
    isLoading,
    hasPreviousSignIn,
    signIn: async () => {
      setIsLoading(true);
      try {
        await signIn(setUserInfo);
      } finally {
        setIsLoading(false);
      }
    },
    signOut: async () => {
      setIsLoading(true);
      try {
        await signOut(setUserInfo);
      } finally {
        setIsLoading(false);
      }
    },
    revokeAccess: async () => {
      setIsLoading(true);
      try {
        await revokeAccess(setUserInfo);
      } finally {
        setIsLoading(false);
      }
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 