import { useMutation } from '@apollo/client';
import { GQL } from '@graphql';
export const useGenerateToken = () => {
  const [generateCustomerToken, { loading, error, data, called }] = useMutation(
    GQL.GENERATE_CUSTOMER_TOKEN,
    {
      // onCompleted: (data) => {
      //   Logger.debug(data, 'sign in complete');
      // },
    },
  );

  /**
   * data = {"generateCustomerToken":{"token":"fzktbjet0d6snz9ontt0g6h0x28j49ew","__typename":"CustomerToken"}}
   */

  return {
    signIn: generateCustomerToken,
    token: data?.generateCustomerToken?.token,
  };
};
