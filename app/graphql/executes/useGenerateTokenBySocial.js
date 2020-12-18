import { useMutation } from '@apollo/client';
import { GENERATE_CUSTOMER_TOKEN_BY_SOCIAL } from '../gql';
import { account } from '@slices';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import ScreenName from '../../screens/ScreenName';
import { useNavigation } from '@react-navigation/native';
export const useGenerateTokenBySocial = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const fcmToken = useSelector((state) => state.app.fcmToken);
  const [submitValue, setSubmitValue] = React.useState(null);
  const [socialSinginResp, setCustomerToken] = React.useState({});
  const [socialSignIn] = useMutation(GENERATE_CUSTOMER_TOKEN_BY_SOCIAL, {
    onCompleted: (data) => {
      Logger.debug(data?.socialSignIn, 'AAAAA sign in complete');
      if (data?.socialSignIn) {
        const { token, otp_confirmed } = data?.socialSignIn || {};
        setCustomerToken(data?.socialSignIn);
        Logger.debug(submitValue, '====> generateCustomerToken');
        if (otp_confirmed) {
          dispatch(account.signInSucceed({ token, ...submitValue }));
        } else {
          navigation.navigate(ScreenName.NewSignUp, {
            customerToken: token,
            typeVerify: 'update',
          });
        }
      }
    },
  });

  /**
   * data = {"generateCustomerToken":{"token":"fzktbjet0d6snz9ontt0g6h0x28j49ew","__typename":"CustomerToken"}}
   */

  const signinSocial = (value) => {
    const { variables } = value || {};
    const submitVal = Object.assign({}, variables, {
      fcmToken: fcmToken ?? '456',
    });
    setSubmitValue(submitVal);
    return socialSignIn({
      variables: submitVal,
    });
  };

  return [socialSinginResp, signinSocial];
};
