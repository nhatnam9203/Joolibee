import { useMutation } from '@apollo/client';
import { GQL } from '@graphql';
import { account } from '@slices';
import { remove, StorageKey, get } from '@storage';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGraphQLClient } from '@graphql';

export const useAppProcess = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.account?.user?.isLogin);
  const isLogout = useSelector((state) => state.account?.isLogout);
  const startApp = useSelector((state) => state.app.loading_app);

  const graphQlClient = useGraphQLClient();

  const [revokeCustomerToken] = useMutation(GQL.REVOKE_CUSTOMER_TOKEN);

  // Process SignOut
  React.useEffect(() => {
    const onSignOut = async () => {
      // call server revoke token

      const { token } = await get(StorageKey.User);
      if (token) {
        await revokeCustomerToken();
      }

      // await client.cache.reset();
      // Evict and garbage-collect the cached user object
      graphQlClient.cache.evict({ fieldName: 'customer' });
      graphQlClient.cache.evict({ fieldName: 'customerCart' });
      graphQlClient.cache.evict({ fieldName: 'products' });
      graphQlClient.cache.gc();

      // remove token
      await remove(StorageKey.User);
    };

    if (isLogout) {
      onSignOut();
      dispatch(account.signOutComplete());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogout]);

  return { startApp, isSignIn: isLogin };
};
