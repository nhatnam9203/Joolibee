import { AUTH_STATUS, useFirebaseAuthentication } from '@firebase';
import { useFocusEffect } from '@react-navigation/native';
import { app, account } from '@slices';
import { validate } from '@utils';
import React from 'react';
import { useDispatch } from 'react-redux';
import { InputPhoneNumber, SignUpForm, VerifyPhoneCode } from './pages';

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

  const onVerifyPhoneError = (response) => {
    setFormData(Object.assign({}, formData, { error: response }));
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
    if (!values) return;

    const { phone = '' } = values || {};
    setFormData(values);

    if (!phone) {
      setFormData(
        Object.assign({}, formData, { error: { code: 'phone-note-found' } }),
      );
      dispatch(app.hideLoading());
      return;
    }

    dispatch(app.showLoading());
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
      if (params?.customerToken) {
        // !! ??? wtf
        // dispatch(account.setPhoneNumber(formData?.phone));
        dispatch(account.signInSucceed(params?.customerToken));
      } else {
        setPage(PAGES.SignUp);
      }
    }
  }, [authStatus, dispatch, formData?.phone, params?.customerToken]);

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
