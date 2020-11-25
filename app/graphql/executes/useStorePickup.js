import { useLazyQuery } from '@apollo/client';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PICKUP } from '../gql';

export const useStorePickup = () => {
  const dispatch = useDispatch();

  const [storePickup, { data, loading, refetch }] = useLazyQuery(STORE_PICKUP, {
    fetchPolicy: 'network-only',
    onCompleted: () => {},
  });

  const onStorePickup = (input) => {
    storePickup(input);
  };

  return {
    storePickup: onStorePickup,
    storeData: data,
  };
};
