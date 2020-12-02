import { useMutation } from '@apollo/client';
import { GENERATE_CUSTOMER_TOKEN } from '../gql';
import { useFirebaseCloudMessing } from '@firebase';

export const useGenerateToken = () => {
  const onForegroundMessage = () => {};
  const onBackgroundMessage = () => {};
  const onOpenedApp = () => {};
  const onInit = () => {};
  const onMessageError = () => {};

  const token = useFirebaseCloudMessing(
    onForegroundMessage,
    onBackgroundMessage,
    onOpenedApp,
    onInit,
    onMessageError,
  );

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

    generateCustomerToken({
      variables: Object.assign({}, variables, { fcmToken: token }),
    });
  };

  return {
    signIn: signInToken,
    customerToken: data?.generateCustomerToken?.token,
  };
};
