import { useFirebaseAuthentication, AUTH_STATUS } from '@firebase';
import { app } from '@slices';
import { validate } from '@utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { InputPhoneNumber, SignUpForm, VerifyPhoneCode } from './pages';
import { useNavigationFocus } from '@hooks';
import { useFocusEffect } from '@react-navigation/native';

const { normalizePhoneNumber } = validate;

const PAGES = {
  InputPhone: 0,
  InputCode: 1,
  SignUp: 2,
};

const SignUpScreen = () => {
  // redux
  const dispatch = useDispatch();
  const [showPage, setPage] = React.useState(PAGES.InputPhone);
  const [formData, setFormData] = React.useState(null);

  const onVerifyPhoneError = (response) => {
    const { message, data, status, error } = response;
    dispatch(app.hideLoading());

    Logger.debug(
      response,
      'SignUpScreen -> Firebase onVerifyPhoneError -> response',
    );
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
    Logger.debug(authStatus, 'authStatus');

    if (authStatus === AUTH_STATUS.sent) {
      dispatch(app.hideLoading());
      setPage(PAGES.InputCode);
    } else if (authStatus === AUTH_STATUS.verified) {
      dispatch(app.hideLoading());
      setPage(PAGES.SignUp);
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
    case PAGES.InputCode:
      return (
        <VerifyPhoneCode
          infos={formData}
          resendCode={() => requestAuthCode(formData)}
          confirmCode={onConfirmCode}
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
