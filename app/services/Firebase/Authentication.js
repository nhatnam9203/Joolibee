import auth from '@react-native-firebase/auth';
import { useState } from 'react';
import { Platform } from 'react-native';
import React from 'react';

export const AUTH_STATUS = {
  none: 'none',
  sent: 'sent',
  timeout: 'timeout',
  confirmCode: 'confirmCode',
  error: 'error',
  verified: 'verified',
};

const TIMEOUT = 60000;
var requestCodeTimer = null;
export const useFirebaseAuthentication = ({ onVerifyPhoneError }) => {
  const [confirm, setConfirm] = useState(null); //  to confirm code
  const [loginUser, setLoginUser] = useState();
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.none);

  // Handle the button press
  async function signInWithPhoneNumber(phone) {
    const confirmation = await auth().signInWithPhoneNumber(phone);

    if (confirmation) {
      setAuthStatus(AUTH_STATUS.sent);
      setConfirm(confirmation);
      requestCodeTimer = setTimeout(() => {
        if (authStatus === AUTH_STATUS.sent) {
          setAuthStatus(AUTH_STATUS.timeout);
        }
      }, TIMEOUT);
    }
  }

  async function confirmCode(input) {
    if (requestCodeTimer) {
      clearTimeout(requestCodeTimer);
      requestCodeTimer = null;
    }
    try {
      setAuthStatus(AUTH_STATUS.confirmCode);
      const user = await confirm.confirm(input);
      if (user) {
        setAuthStatus(AUTH_STATUS.verified);
        setLoginUser(user);
      }
    } catch (error) {
      console.log(`Firebase confirm error code ${error?.code}`, error);
      setAuthStatus(AUTH_STATUS.error);
      if (typeof onVerifyPhoneError === 'function') {
        let code;
        switch (error?.code) {
          case 'auth/invalid-verification-code':
            code = 'invalid-verification-code';
            break;
          case 'auth/timeout':
            code = 'timeout';
            break;
          case 'auth/invalid-phone-number':
            code = 'invalid-phone-number';
            break;
          case 'auth/too-many-requests':
            code = 'too-many-requests';
            break;
          case 'auth/network-request-failed':
            code = 'network-request-failed';
            break;
          default:
            code = error?.code;
            break;
        }
        onVerifyPhoneError({ code });
      }
    }
  }

  // Handle android auto change
  const onAuthStateChanged = (user) => {
    console.log(user);
    if (
      (authStatus === AUTH_STATUS.confirmCode ||
        authStatus === AUTH_STATUS.sent) &&
      user &&
      Platform.OS === 'android'
    ) {
      setAuthStatus(AUTH_STATUS.verified);
      setLoginUser(user);
    }
  };

  const signOut = async () => {
    if (loginUser) {
      await auth().signOut();
      setLoginUser(null);
      setConfirm(null);
      setAuthStatus(AUTH_STATUS.none);
      // setVerificationId(null);
    }
  };

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    confirmCode,
    signInWithPhoneNumber,
    signOut,
    authStatus,
  };
};
