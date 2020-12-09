import { useMutation } from '@apollo/client';
import { GENERATE_CUSTOMER_TOKEN } from '../gql';
import { useFirebaseCloudMessing } from '@firebase';
import { useSelector } from 'react-redux';

export const useGenerateToken = () => {
  const token = useSelector((state) => state.app.fcmToken);

  const [generateCustomerToken, { loading, error, data, called }] = useMutation(
    GENERATE_CUSTOMER_TOKEN,
    {
      // onCompleted: (data) => {
      //   Logger.debug(data, 'sign in complete');
      // },
    },
  );

  /**
   * data = {"generateCustomerToken":{"token":"fzktbjet0d6snz9ontt0g6h0x28j49ew","__typename":"CustomerToken"}}
   */

  const signInToken = (value) => {
    const { variables } = value || {};
    Logger.debug(token, 'signInToken');
    generateCustomerToken({
      variables: Object.assign({}, variables, { fcmToken: token ?? '456' }),
    });
  };

  return {
    signIn: signInToken,
    customerToken: data?.generateCustomerToken?.token,
  };
};
