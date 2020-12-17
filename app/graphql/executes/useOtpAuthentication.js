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

export const useOtpAuthentication = ({ onVerifyPhoneError }) => {
  const [authStatus, setAuthStatus] = useState(AUTH_STATUS.none);
  const [second_expired, setExprired] = useState(null);
  const [otpCode, setOtpCode] = React.useState(null);
  const [getOTP] = useMutation(GET_OTP);
  const [verfiyOTP] = useMutation(VERIFY_OTP);
  // Handle the button press
  async function signInWithPhoneNumber(input) {
    setAuthStatus(AUTH_STATUS.none);
    const confirmation = await getOTP({
      variables: input,
    });
    Logger.debug(input, 'getOTP');
    Logger.debug(confirmation?.data?.getOTP, 'confirmation');

    if (confirmation?.data?.getOTP) {
      setExprired(confirmation?.data?.getOTP?.OTPExpiredAfter);
      if (confirmation?.data?.getOTP?.spam) {
        setAuthStatus(AUTH_STATUS.spam);
      } else if (confirmation?.data?.getOTP?.phoneNumberExisted) {
        setAuthStatus(AUTH_STATUS.existed);
      } else if (confirmation?.data?.getOTP?.error) {
        setAuthStatus(AUTH_STATUS.error);
      } else {
        setAuthStatus(AUTH_STATUS.sent);
      }
    }
  }

  async function confirmCode(input) {
    try {
      setAuthStatus(AUTH_STATUS.confirmCode);
      const confirmed = await verfiyOTP({
        variables: input,
      });
      if (confirmed?.data?.verfiyOTP?.result) {
        Logger.debug(confirmed?.data?.verfiyOTP?.result, 'confirmed');
        setOtpCode(input?.otpCode);
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
    smsCode: otpCode,
  };
};
