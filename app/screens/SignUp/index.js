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
  const [formData, setFormData] = React.useState(null);

  const verifyCallback = (response) => {
    const { message, data, status } = response;
    dispatch(hideLoading());
    if (status === 1) {
      // Verified
      setFormData(Object.assign({}, formData, { verified: status === 1 }));
    }
    Logger.debug(message, 'SignUpScreen -> verifyCallback -> message');
    Logger.debug(data, 'SignUpScreen -> verifyCallback -> data');
  };

  const { confirmCode, signInWithPhoneNumber } = useFirebaseAuthentication({
    verifyCallback: verifyCallback,
  });

  const onConfirmCode = async (code) => {
    if (!code) {
      return;
    }
    dispatch(showLoading());
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
      setFormData(Object.assign({}, values, { verificationId }));
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
    setPage(PAGES.SignUp);
  };

  switch (showPage) {
    case 0:
    default:
      return <InputPhoneNumber next={onSubmitPhoneNumber} />;
    case 1:
      return (
        <VerifyPhoneCode
          next={onSubmitVerifyCode}
          infos={formData}
          resendCode={() => requestAuthCode(formData)}
          confirmCode={onConfirmCode}
        />
      );
    case 2:
      return <SignUpForm infos={formData} />;
  }
};

export default SignUpScreen;
