import React from 'react';
import { InputPhoneNumber, InputNewPassword, VerifyPhoneCode } from './pages';

const PAGES = {
  InputPhone: 0,
  InputCode: 1,
  InputNewPassWord: 2,
};

const ForgotPasswordScreen = () => {
  // redux

  const [showPage, setPage] = React.useState(PAGES.InputPhone);

  switch (showPage) {
    case 0:
    default:
      return <InputPhoneNumber next={() => setPage(PAGES.InputCode)} />;
    case 1:
      return <VerifyPhoneCode next={() => setPage(PAGES.InputNewPassWord)} />;
    case 2:
      return <InputNewPassword />;
  }
};

export default ForgotPasswordScreen;
