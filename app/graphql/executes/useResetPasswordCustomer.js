import { useMutation } from '@apollo/client';
import { getUniqueId } from 'react-native-device-info';
import { RESET_PASSWORD_CUSTOMER } from '../gql';

export const useResetPasswordCustomer = () => {
  const [resetPassword, resetPasswordResp] = useMutation(
    RESET_PASSWORD_CUSTOMER,
  );

  const resetPasswordCustomer = (params) => {
    let { variables } = params;
    variables = Object.assign({}, variables, { deviceId: getUniqueId() });
    Logger.debug(variables, '========> variables variables variables');
    return resetPassword({
      variables,
    });
  };

  return [resetPasswordResp, resetPasswordCustomer];
};
