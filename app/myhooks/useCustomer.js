import React from 'react';
import { useMutation, useQuery, useApolloClient } from '@apollo/client';
import { mutation, query } from '@graphql';
import { useDispatch } from 'react-redux';
import { account, app } from '@slices';
import { remove, StorageKey, clearForKey } from '@storage';
import AsyncStorage from '@react-native-community/async-storage';

export const useCustomer = () => {
  const dispatch = useDispatch();
  const client = useApolloClient();

  const { data } = useQuery(query.CUSTOMER_INFO, {
    fetchPolicy: 'cache-first',
  });

  const [revokeCustomerToken, response] = useMutation(mutation.SIGN_OUT);

  if (data?.customer) {
    dispatch(account.saveUserInfo(data));
  }

  const signOut = async () => {
    // call server signOut
    await revokeCustomerToken();

    // reset redux
    await dispatch(account.signOutRequest());
    await remove(StorageKey.User);

    await client.clearStore();
    await AsyncStorage.clear();
  };

  return { user: data?.customer, signOut };
};
