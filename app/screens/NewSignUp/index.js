import { useFocusEffect } from '@react-navigation/native';
import { app, account } from '@slices';
import { validate } from '@utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { InputPhoneNumber, SignUpForm, VerifyPhoneCode } from './pages';
import { GEX } from '@graphql';
import { getUniqueId } from 'react-native-device-info';
const { normalizePhoneNumber } = validate;

const PAGES = {
  InputPhone: 0,
  InputCode: 1,
  SignUp: 2,
};

const SignUpScreen = ({ route }) => {
  const { params } = route || {};

  // redux
  const dispatch = useDispatch();
  const [showPage, setPage] = React.useState(PAGES.InputPhone);
  const [formData, setFormData] = React.useState(null);
  const [blocked, setBlock] = React.useState(false);
  const onVerifyPhoneError = (response) => {
    setFormData(Object.assign({}, formData, { error: response }));
    dispatch(app.hideLoading());
  };
  const AUTH_STATUS = GEX.AUTH_STATUS;
  const {
    confirmCode,
    signInWithPhoneNumber,
    authStatus,
    second_expired,
  } = GEX.useOtpAuthentication({
    onVerifyPhoneError: onVerifyPhoneError,
  });
  const onConfirmCode = async (code, phone) => {
    if (!code) {
      return;
    }
    let input = {
      deviceId: getUniqueId(),
      phoneNumber: normalizePhoneNumber('+84', phone),
      type: params?.typeVerify,
      otpCode: code,
    };
    dispatch(app.showLoading());
    await confirmCode(input);
  };

  const requestAuthCode = async (values) => {
    const { phone } = values;
    setFormData(values);

    if (!phone) {
      setFormData(
        Object.assign({}, formData, { error: { code: 'phone-note-found' } }),
      );
      dispatch(app.hideLoading());
      return;
    }

    dispatch(app.showLoading());
    let input = {
      phoneNumber: normalizePhoneNumber('+84', phone),
      deviceId: getUniqueId(),
      type: params?.typeVerify,
    };

    await signInWithPhoneNumber(input);
  };

  // Get firebase code after input phone number
  const onSubmitPhoneNumber = async (values) => {
    await requestAuthCode(values);
  };

  React.useEffect(() => {
    if (authStatus === AUTH_STATUS.sent) {
      setPage(PAGES.InputCode);
    } else if (authStatus === AUTH_STATUS.verified) {
      if (params?.customerToken) {
        dispatch(account.setPhoneNumber(formData?.phone));
        dispatch(account.signInSucceed(params?.customerToken));
      } else {
        setPage(PAGES.SignUp);
      }
    } else if (authStatus === AUTH_STATUS.spam) {
      // setBlock(true);
      setPage(PAGES.InputCode);
    }
    dispatch(app.hideLoading());
  }, [AUTH_STATUS, authStatus, dispatch, formData?.phone, params]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        setPage(PAGES.InputPhone);
      };
    }, []),
  );

  switch (showPage) {
    case PAGES.InputCode:
      return (
        <VerifyPhoneCode
          infos={formData}
          resendCode={requestAuthCode}
          confirmCode={onConfirmCode}
          timeOut={second_expired}
          blocked={blocked}
        />
      );
    case PAGES.SignUp:
      return <SignUpForm infos={formData} />;
    case PAGES.InputPhone:
    default:
      return <InputPhoneNumber next={onSubmitPhoneNumber} />;
  }
};

export default SignUpScreen;
