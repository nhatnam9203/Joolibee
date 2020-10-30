import { useFirebaseAuthentication } from '@firebase';
import { app } from '@slices';
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

const SignUpScreen = () => {
  // redux
  const dispatch = useDispatch();
  const [showPage, setPage] = React.useState(PAGES.InputPhone);
  const [formData, setFormData] = React.useState(null);

  const verifyCallback = (response) => {
    const { message, data, status } = response;
    dispatch(app.hideLoading());
    if (status === 1) {
      // Verified
      setFormData(Object.assign({}, formData, { verified: status === 1 }));
    }

    Logger.debug(
      response,
      'SignUpScreen -> Firebase verifyCallback -> response',
    );
  };

  const { confirmCode, signInWithPhoneNumber } = useFirebaseAuthentication({
    verifyCallback: verifyCallback,
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
      Logger.error(error, 'SignUp -> requestAuthCode -> phone not found!');
      return;
    }

    dispatch(app.showLoading());

    // call firebase phone auth
    const { verificationId, error } = await signInWithPhoneNumber(
      normalizePhoneNumber('+84', phone),
    );

    dispatch(app.hideLoading());
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
    case 0:
    default:
      return <InputPhoneNumber next={onSubmitPhoneNumber} />;
  }
};

export default SignUpScreen;
