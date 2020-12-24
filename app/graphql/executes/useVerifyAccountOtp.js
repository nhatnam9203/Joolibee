import { useMutation } from '@apollo/client';
import { VERIFY_ACCOUNT_OTP } from '../gql';
import { account } from '@slices';
import { useDispatch } from 'react-redux';
import React from 'react';
import { getUniqueId } from 'react-native-device-info';
export const useVerifyAccountOtp = () => {
  const dispatch = useDispatch();
  const [submitValue, setSubmitValue] = React.useState(null);
  const [verifyAccountOtp] = useMutation(VERIFY_ACCOUNT_OTP, {
    onCompleted: (data) => {
      Logger.debug(data, '========> data data data');
      if (data?.verifyAccountOtp?.result) {
        dispatch(
          account.signInSucceed({
            ...submitValue,
            phone_number: submitValue?.phoneNumber,
          }),
        );
      }
    },
  });

  /**
   * data = {"generateCustomerToken":{"token":"fzktbjet0d6snz9ontt0g6h0x28j49ew","__typename":"CustomerToken"}}
   */

  const onVerifyAccountOtp = (value) => {
    const { variables } = value || {};

    const submitVal = Object.assign({}, variables, {
      deviceId: getUniqueId(),
    });
    Logger.debug(submitVal, '========> variables variables variables');
    setSubmitValue(submitVal);
    return verifyAccountOtp({
      variables: submitVal,
    });
  };

  return [onVerifyAccountOtp];
};
