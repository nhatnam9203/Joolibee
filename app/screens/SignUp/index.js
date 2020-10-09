import React from 'react';
import { InputPhoneNumber, SignUpForm, VerifyPhoneCode } from './pages';
import { useFirebaseAuthentication } from '@firebase';
import { validate } from '@utils';
import { hideLoading, showLoading } from '@slices/app';
import { useDispatch } from 'react-redux';

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

  const requestAuthCode = async (values) => {
    const { phone } = values;
    if (!phone) {
      Logger.error(error, 'SignUp -> requestAuthCode -> phone not found!');
      return;
    }

    dispatch(showLoading());

    // call firebase phone auth
    const { verificationId, error } = await signInWithPhoneNumber(
      normalizePhoneNumber('+84', phone),
    );

    dispatch(hideLoading());
    // response
    if (verificationId) {
      setData(Object.assign({}, values, { verificationId }));
      // next step
      setPage(PAGES.InputCode);
    } else if (error) {
      // show error
      Logger.error(error, 'SignUp -> requestAuthCode -> get code error!');
    }
  };

  // Get firebase code after input phone number
  const onSubmitPhoneNumber = async (values) => {
    await requestAuthCode(values);
  };

  //
  const onSubmitVerifyCode = (values) => {
    Logger.info(values, 'onSubmitVerifyCode');
  };

  switch (showPage) {
    case 0:
    default:
      return <InputPhoneNumber next={onSubmitPhoneNumber} />;
    case 1:
      return (
        <VerifyPhoneCode
          next={onSubmitVerifyCode}
          infos={data}
          resendCode={() => requestAuthCode(data)}
        />
      );
    case 2:
      return <SignUpForm infos={data} />;
  }
};

export default SignUpScreen;
