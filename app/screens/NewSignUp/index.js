import { useFocusEffect } from '@react-navigation/native';
import { app, account } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';
import { InputPhoneNumber, SignUpForm, VerifyPhoneCode } from './pages';
import { GEX } from '@graphql';
import { getUniqueId } from 'react-native-device-info';
import NavigationService from '../../navigation/NavigationService';
import { translate } from '@localize';
// const { normalizePhoneNumber } = validate;

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
  const AUTH_STATUS = GEX.AUTH_STATUS;
  const {
    confirmCode,
    signInWithPhoneNumber,
    authStatus,
    second_expired,
    smsCode,
  } = GEX.useOtpAuthentication({
    onVerifyPhoneError: onVerifyPhoneError,
  });

  const onConfirmCode = async (code, phone) => {
    if (!code) {
      return;
    }
    let input = {
      deviceId: getUniqueId(),
      phoneNumber: phone,
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
      phoneNumber: phone,
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
    if (authStatus === AUTH_STATUS.verified) {
      if (params?.customerToken) {
        dispatch(app.savePhoneVerify(''));
        dispatch(account.setPhoneNumber(formData?.phone));
        dispatch(account.signInSucceed(params?.customerToken));
      } else {
        dispatch(app.hideLoading());
        setPage(PAGES.SignUp);
      }
    } else if (authStatus === AUTH_STATUS.sent) {
      dispatch(app.hideLoading());
      setPage(PAGES.InputCode);
    } else if (authStatus === AUTH_STATUS.spam) {
      setPage(PAGES.InputCode);
      dispatch(app.toggleBlockSpam(true));
      dispatch(app.hideLoading());
    } else if (authStatus === AUTH_STATUS.existed) {
      NavigationService.alertWithError({
        message: translate('txtPhoneExisted'),
      });
    } else {
      dispatch(app.hideLoading());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authStatus]);

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
        />
      );
    case PAGES.SignUp:
      return <SignUpForm infos={formData} smsCode={smsCode} />;
    case PAGES.InputPhone:
    default:
      return <InputPhoneNumber next={onSubmitPhoneNumber} />;
  }
};

export default SignUpScreen;
