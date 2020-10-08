import React from 'react';
import { InputPhoneNumber, SignUpForm, VerifyPhoneCode } from './pages';
import { useFirebaseAuthentication } from '@firebase';
import { normalizePhoneNumber } from '@utils';

const PAGES = {
  InputPhone: 0,
  InputCode: 1,
  SignUp: 2,
};

const SignUpScreen = () => {
  // redux

  const [showPage, setPage] = React.useState(PAGES.InputPhone);
  const [data, setData] = React.useState(null);

  const verifyCallback = (response) => {
    const { message, data, status } = response;
    if (status === 1) {
      // Verified
    }
    Logger.debug(message, 'SignUpScreen -> verifyCallback -> message');
  };

  const { confirmCode, signInWithPhoneNumber } = useFirebaseAuthentication({
    verifyCallback: verifyCallback,
  });

  const onConfirmCode = async (code) => {
    if (!code) {
      return;
    }
    await confirmCode(code);
  };

  const sendFirebaseCode = async (phone) => {
    await signInWithPhoneNumber(normalizePhoneNumber('+84', phone));
  };

  const onSubmitPhoneNumber = async (values) => {
    setData(values);
    const { phone } = values;

    const response = await sendFirebaseCode(phone);
    Logger.info(response, 'onSubmitPhoneNumber -> response');

    // setPage(PAGES.InputCode);
  };

  const onSubmitVerifyCode = (values) => {
    Logger.info(values, 'onSubmitVerifyCode');
  };

  switch (showPage) {
    case 0:
    default:
      return <InputPhoneNumber next={onSubmitPhoneNumber} />;
    case 1:
      return <VerifyPhoneCode next={onSubmitVerifyCode} infos={data} />;
    case 2:
      return <SignUpForm infos={data} />;
  }
};

export default SignUpScreen;
