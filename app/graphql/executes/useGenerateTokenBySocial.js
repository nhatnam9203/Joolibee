import { useMutation } from '@apollo/client';
import { GENERATE_CUSTOMER_TOKEN_BY_SOCIAL } from '../gql';
import { useFirebaseCloudMessing } from '@firebase';
import { useSelector } from 'react-redux';

export const useGenerateTokenBySocial = () => {
  const token = useSelector((state) => state.app.fcmToken);

  const [socialSignIn, { loading, error, data, called }] = useMutation(
    GENERATE_CUSTOMER_TOKEN_BY_SOCIAL,
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
    // Logger.debug(
    //   Object.assign({}, variables, { fcmToken: token }),
    //   'signInToken',
    // );
    return socialSignIn({
      variables: Object.assign({}, variables, { fcmToken: token ?? '456' }),
    });
  };

  return {
    socialSignIn: signInToken,
    customerToken: data?.generateCustomerToken?.token,
  };
};