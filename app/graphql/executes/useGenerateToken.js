import { useMutation } from '@apollo/client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GENERATE_CUSTOMER_TOKEN } from '../gql';
import { account } from '@slices';

export const useGenerateToken = () => {
  const dispatch = useDispatch();
  const fcmToken = useSelector((state) => state.app.fcmToken);
  const [customerToken, setCustomerToken] = React.useState(null);
  const [submitValue, setSubmitValue] = React.useState(null);

  const [generateCustomerToken] = useMutation(GENERATE_CUSTOMER_TOKEN, {
    onCompleted: (data) => {
      Logger.debug(
        data?.generateCustomerToken?.token,
        'AAAAA sign in complete',
      );

      const token = data?.generateCustomerToken?.token;

      setCustomerToken(token);
      Logger.debug(submitValue, '====> generateCustomerToken');

      dispatch(account.signInSucceed({ token, ...submitValue }));
    },
  });

  /**
   * data = {"generateCustomerToken":{"token":"fzktbjet0d6snz9ontt0g6h0x28j49ew","__typename":"CustomerToken"}}
   */

  const signIn = (value) => {
    const { variables } = value || {};
    const submitVal = Object.assign({}, variables, {
      fcmToken: fcmToken ?? '456',
    });

    setSubmitValue(submitVal);

    generateCustomerToken({
      variables: submitVal,
    });
  };

  return {
    signIn: signInToken,
    customerToken: data?.generateCustomerToken?.token,
    otp_confirmed: data?.generateCustomerToken?.otp_confirmed,
  };
  return [customerToken, signIn];
};
