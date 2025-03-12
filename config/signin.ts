import { useState } from 'react';
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  type User,
  isNoSavedCredentialFoundResponse,
  type SignInSilentlyResponse
} from '@react-native-google-signin/google-signin';

export const useGoogleSignInState = () => {
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [hasPreviousSignIn, setHasPreviousSignIn] = useState(false);
  return { userInfo, setUserInfo, hasPreviousSignIn, setHasPreviousSignIn };
};

export const checkPreviousSignIn = async (setHasPreviousSignIn: (value: boolean) => void) => {
  const hasSignIn = await GoogleSignin.hasPreviousSignIn();
  setHasPreviousSignIn(hasSignIn);
};

export const getCurrentUser = async (setUserInfo: (user: User | null) => void) => {
  try {
    const response = await GoogleSignin.signInSilently();
    if ('user' in response) {
      setUserInfo(response.user as User);
    } else {
      setUserInfo(null);
    }
  } catch (error) {
    console.error('Get current user error:', error);
  }
};

export const signIn = async (setUserInfo: (user: User | null) => void) => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      setUserInfo(response.data);
    }
  } catch (error) {
    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only
          break;
        default:
          console.error('Sign in error:', error);
      }
    }
  }
};

export const signOut = async (setUserInfo: (user: User | null) => void) => {
  try {
    await GoogleSignin.signOut();
    setUserInfo(null);
  } catch (error) {
    console.error('Sign out error:', error);
  }
};

export const revokeAccess = async (setUserInfo: (user: User | null) => void) => {
  try {
    await GoogleSignin.revokeAccess();
    setUserInfo(null);
    // Google Account disconnected from your app
  } catch (error) {
    console.error('Revoke access error:', error);
  }
};

// Optional: Keep the original hook for backwards compatibility
export const useGoogleSignIn = () => {
  const { userInfo, setUserInfo, hasPreviousSignIn, setHasPreviousSignIn } = useGoogleSignInState();

  return {
    userInfo,
    hasPreviousSignIn,
    signIn: () => signIn(setUserInfo),
    signOut: () => signOut(setUserInfo),
    revokeAccess: () => revokeAccess(setUserInfo),
    getCurrentUser: () => getCurrentUser(setUserInfo),
    checkPreviousSignIn: () => checkPreviousSignIn(setHasPreviousSignIn)
  };
};