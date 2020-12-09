import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { GET_OTP, VERIFY_OTP } from '../gql';
import { format } from '@utils';
export const AUTH_STATUS = {
  none: 'none',
  sent: 'sent',
  timeout: 'timeout',
  confirmCode: 'confirmCode',
  error: 'error',
  verified: 'verified',
  spam: 'spam',
  existed: 'existed',
};

var requestCodeTimer = null;
export const useOtpAuthentication = ({ onVerifyPhoneError }) => {
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.none);
  const [second_expired, setExprired] = useState(null);
  const [getOTP] = useMutation(GET_OTP);
  const [verfiyOTP] = useMutation(VERIFY_OTP);
  // Handle the button press
  async function signInWithPhoneNumber(input) {
    setAuthStatus(AUTH_STATUS.none);
    const confirmation = await getOTP({
      variables: input,
    });
    console.log('confirmation', confirmation?.data?.getOTP);
    setExprired(format.compareTime(confirmation?.data?.getOTP?.expiredAt));
    if (confirmation?.data?.getOTP) {
      setAuthStatus(AUTH_STATUS.sent);
      requestCodeTimer = setTimeout(() => {
        if (authStatus === AUTH_STATUS.sent) {
          setAuthStatus(AUTH_STATUS.timeout);
        }

        clearTimeout(requestCodeTimer);
        requestCodeTimer = null;
      }, second_expired);
    }
    if (confirmation?.data?.getOTP?.spam) {
      setAuthStatus(AUTH_STATUS.spam);
    }
    // if (confirmation?.data?.getOTP?.existed) {
    //   setAuthStatus(AUTH_STATUS.existed);
    // }
  }

  async function confirmCode(input) {
    if (requestCodeTimer) {
      clearTimeout(requestCodeTimer);
      requestCodeTimer = null;
    }
    try {
      setAuthStatus(AUTH_STATUS.confirmCode);
      const confirmed = await verfiyOTP({
        variables: input,
      });
      if (confirmed?.data?.verfiyOTP?.result) {
        setAuthStatus(AUTH_STATUS.verified);
      } else {
        setAuthStatus(AUTH_STATUS.error);
        onVerifyPhoneError({ code: 'Mã xác thực không chính xác!' });
      }
    } catch (error) {
      setAuthStatus(AUTH_STATUS.error);
      onVerifyPhoneError({ code: 'Xảy ra lỗi không xác định' });
    }
  }

  // Handle android auto change

  const signOut = async () => {
    setAuthStatus(AUTH_STATUS.none);
  };

  return {
    confirmCode,
    signInWithPhoneNumber,
    signOut,
    authStatus,
    second_expired,
  };
};
