import { useMutation } from '@apollo/client';
import { REGISTER_CUSTOMER } from '../gql';
import { useSelector } from 'react-redux';

export const useRegisterCustomer = () => {
  const token = useSelector((state) => state.app.fcmToken);

  const [registerCustomer, registerCustomerResp] = useMutation(
    REGISTER_CUSTOMER,
  );

  const onRegisterCustomer = (value) => {
    const { variables } = value || {};
    Logger.debug(
      Object.assign({}, variables, { fcmToken: token }),
      'registerCustomer',
    );
    return registerCustomer({
      variables,
    });
  };

  return {
    registerCustomer: onRegisterCustomer,
    registerCustomerResp,
  };
};
