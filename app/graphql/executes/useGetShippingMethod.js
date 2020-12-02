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
    const { cityId = 1, districtId = 5 } = my_location || {};
    // sure la co gui len district va city
    storePickup(
      input ?? {
        variables: Object.assign({}, my_location, { cityId, districtId }),
      },
    );
  };

  return {
    getShippingMethod: onShippingMethods,
    getShippingMethodResp: response,
  };
};
