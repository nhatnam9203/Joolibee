import { useMutation } from '@apollo/client';
import { GQL, GEX } from '@graphql';
import { account } from '@slices';
import { remove, StorageKey, get } from '@storage';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useGraphQLClient } from '@graphql';

// thực hiện chức năng cần khi signin - signout
export const useSignInFlow = () => {
  const dispatch = useDispatch();

  // bắt sự kiện khi app signin | sigout
  const isSignIn = useSelector((state) => state.account?.user?.isLogin);
  // bắt sự kiện khi start app
  const startApp = useSelector((state) => state.app.loading_app);

  const graphQlClient = useGraphQLClient();
  const [revokeCustomerToken] = useMutation(GQL.REVOKE_CUSTOMER_TOKEN, {
    errorPolicy: 'ignore',
  });

  const signOut = () => {
    onSignOut();
    // clear redux state
    dispatch(account.signOutComplete());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  const onSignOut = async () => {
    // call server revoke token
    // const { token } = await get(StorageKey.User);
    // if (token) {
    //   await revokeCustomerToken();
    // }

    // Evict and garbage-collect the cached user object
    graphQlClient.cache.evict({ fieldName: 'customer' });
    graphQlClient.cache.evict({ fieldName: 'customerCart' });
    graphQlClient.cache.evict({ fieldName: 'customerOrders' });
    graphQlClient.cache.gc();

    // remove token
    await remove(StorageKey.User);
  };

  return [{ startApp, isSignIn }, signOut];
};
