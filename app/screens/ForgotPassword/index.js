import React from 'react';
import { InputPhoneNumber, InputNewPassword, VerifyPhoneCode } from './pages';
import { validate } from '@utils';
import { app } from '@slices';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { AUTH_STATUS, useFirebaseAuthentication } from '@firebase';

const PAGES = {
  InputPhone: 0,
  InputCode: 1,
  InputNewPassWord: 2,
};
const { normalizePhoneNumber } = validate;

const ForgotPasswordScreen = () => {
  // redux
  const dispatch = useDispatch();

  const [showPage, setPage] = React.useState(PAGES.InputPhone);
  const [formData, setFormData] = React.useState(null);

  const onVerifyPhoneError = (response) => {
    dispatch(app.hideLoading());
  };

  const {
    confirmCode,
    signInWithPhoneNumber,
    authStatus,
  } = useFirebaseAuthentication({
    onVerifyPhoneError: onVerifyPhoneError,
  });

  const onConfirmCode = async (code) => {
    if (!code) {
      return;
    }

    dispatch(app.showLoading());
    await confirmCode(code);
  };

  const requestAuthCode = async (values) => {
    const { phone } = values;
    if (!phone) {
      Logger.error('error', 'SignUp -> requestAuthCode -> phone not found!');
      return;
    }

    dispatch(app.showLoading());
    setFormData(values);

    // call firebase phone auth
    await signInWithPhoneNumber(normalizePhoneNumber('+84', phone));
  };

  // Get firebase code after input phone number
  const onSubmitPhoneNumber = async (values) => {
    await requestAuthCode(values);
  };

  React.useEffect(() => {
    if (authStatus === AUTH_STATUS.sent) {
      dispatch(app.hideLoading());
      setPage(PAGES.InputCode);
    } else if (authStatus === AUTH_STATUS.verified) {
      dispatch(app.hideLoading());
      setPage(PAGES.InputNewPassWord);
    }
  }, [authStatus, dispatch]);

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
    case 1:
      return (
        <VerifyPhoneCode
          next={() => setPage(PAGES.InputNewPassWord)}
          infos={formData}
          resendCode={() => requestAuthCode(formData)}
          confirmCode={onConfirmCode}
        />
      );
    case 2:
      return <InputNewPassword infos={formData} />;

    case 0:
    default:
      return <InputPhoneNumber next={onSubmitPhoneNumber} />;
  }
};

export default ForgotPasswordScreen;
