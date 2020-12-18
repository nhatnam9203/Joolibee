import { useMutation } from '@apollo/client';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GENERATE_CUSTOMER_TOKEN } from '../gql';
import { account } from '@slices';
import ScreenName from '../../screens/ScreenName';
import { useNavigation } from '@react-navigation/native';
export const useGenerateToken = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const fcmToken = useSelector((state) => state.app.fcmToken);
  const [{ customerToken, otpConfirmed }, setCustomerToken] = React.useState(
    {},
  );
  const [submitValue, setSubmitValue] = React.useState(null);

  const [generateCustomerToken] = useMutation(GENERATE_CUSTOMER_TOKEN, {
    onCompleted: (data) => {
      Logger.debug(
        data?.generateCustomerToken?.token,
        'AAAAA sign in complete',
      );

      const { token, otp_confirmed } = data?.generateCustomerToken || {};

      setCustomerToken({ customerToken: token, otpConfirmed: otp_confirmed });
      Logger.debug(submitValue, '====> generateCustomerToken');

      // if (otp_confirmed) {
      //   dispatch(
      //     account.signInSucceed({
      //       ...submitValue,
      //       token,
      //       phone_number: submitValue?.email,
      //     }),
      //   );
      // } else {
      //   navigation.navigate(ScreenName.NewSignUp, {
      //     customerToken: token,
      //     typeVerify: 'update',
      //   });
      // }

      if (token) {
        dispatch(account.signInSucceed({ token, ...submitValue }));
      }
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

  return [{ customerToken, otpConfirmed }, signIn];
};
