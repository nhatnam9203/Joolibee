import React from 'react';
import { InputPhoneNumber, InputNewPassword, VerifyPhoneCode } from './pages';
import { app } from '@slices';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getUniqueId } from 'react-native-device-info';
import { GEX } from '@graphql';
import NavigationService from '../../navigation/NavigationService';
import { translate } from '@localize';
const PAGES = {
  InputPhone: 0,
  InputCode: 1,
  InputNewPassWord: 2,
};
const TYPE_VERIFY = 'reset';

const ForgotPasswordScreen = () => {
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
      type: TYPE_VERIFY,
      otpCode: code,
    };
    dispatch(app.showLoading());
    await confirmCode(input);
  };

  const requestAuthCode = async (values) => {
    const { phone } = values;
    if (!phone) {
      Logger.error('error', 'SignUp -> requestAuthCode -> phone not found!');
      return;
    }
    dispatch(app.showLoading());
    setFormData(values);
    let input = {
      phoneNumber: phone,
      deviceId: getUniqueId(),
      type: TYPE_VERIFY,
    };
    // call firebase phone auth
    await signInWithPhoneNumber(input);
  };

  // Get firebase code after input phone number
  const onSubmitPhoneNumber = async (values) => {
    await requestAuthCode(values);
  };

  React.useEffect(() => {
    if (authStatus === AUTH_STATUS.verified) {
      dispatch(app.hideLoading());
      setPage(PAGES.InputNewPassWord);
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
  }, [AUTH_STATUS, authStatus, dispatch]);

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
          infos={formData}
          resendCode={requestAuthCode}
          confirmCode={onConfirmCode}
          timeOut={second_expired}
        />
      );
    case 2:
      return <InputNewPassword infos={formData} smsCode={smsCode} />;

    case 0:
    default:
      return <InputPhoneNumber next={onSubmitPhoneNumber} />;
  }
};

export default ForgotPasswordScreen;
