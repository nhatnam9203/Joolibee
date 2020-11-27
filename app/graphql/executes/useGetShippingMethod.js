import { useLazyQuery } from '@apollo/client';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PICKUP } from '../gql';

export const useGetShippingMethod = () => {
  const dispatch = useDispatch();
  const my_location = useSelector((state) => state.store.my_location);

  const [storePickup, response] = useLazyQuery(STORE_PICKUP, {
    fetchPolicy: 'network-only',
  });

  const onShippingMethods = (input) => {
    storePickup(input ?? { variables: my_location });
  };

  return {
    getShippingMethod: onShippingMethods,
    getShippingMethodResp: response,
  };
};
