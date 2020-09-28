import React from 'react';
import { InputPhoneNumber, SignUpForm, VerifyPhoneCode } from './pages';

const PAGES = {
  InputPhone: 0,
  InputCode: 1,
  SignUp: 2,
};

const SignUpScreen = () => {
  // redux

  const [showPage, setPage] = React.useState(PAGES.InputPhone);

  switch (showPage) {
    case 0:
    default:
      return <InputPhoneNumber next={() => setPage(PAGES.InputCode)} />;
    case 1:
      return <VerifyPhoneCode next={() => setPage(PAGES.SignUp)} />;
    case 2:
      return <SignUpForm />;
  }
};

export default SignUpScreen;
