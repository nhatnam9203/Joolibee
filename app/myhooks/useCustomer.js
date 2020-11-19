import React from 'react';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { mutation, query } from '@graphql';
import { useDispatch } from 'react-redux';
import { account, app } from '@slices';
import { remove, StorageKey, clearForKey } from '@storage';
import AsyncStorage from '@react-native-community/async-storage';
import { useGraphqlClient } from './useGraphqlClient';

export const useCustomer = () => {
  const dispatch = useDispatch();
  const { persistor } = useGraphqlClient();

  const { data } = useQuery(query.CUSTOMER_INFO, {
    fetchPolicy: 'no-cache',
  });

  const [revokeCustomerToken, response] = useMutation(mutation.SIGN_OUT);

  // ! TODO: chỗ này có cần không ? wtf men ?
  if (data?.customer) {
    dispatch(account.saveUserInfo(data));
  }

  const signOut = async () => {
    Logger.debug('', 'SignOut >>> customer >>> hook');
    // call server signOut
    await revokeCustomerToken();

    // reset redux
    await dispatch(account.signOutRequest());
    await remove(StorageKey.User);
    persistor.restore();
    await AsyncStorage.clear();
  };

  return { user: data?.customer, signOut };
};
