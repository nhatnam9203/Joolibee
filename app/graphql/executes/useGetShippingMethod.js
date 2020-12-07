import { useLazyQuery } from '@apollo/client';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PICKUP } from '../gql';

export const useGetShippingMethod = () => {
  const pickupLocation = useSelector((state) => state.store.pickupLocation);
  Logger.debug(pickupLocation, 'pickupLocation');

  const [storePickup, shippingMethodResp] = useLazyQuery(STORE_PICKUP, {
    fetchPolicy: 'network-only',
  });

  const getShippingMethods = (input) => {
    const { cityId = 1, districtId = 5 } = pickupLocation || {};
    // sure la co gui len district va city
    storePickup(
      input ?? {
        variables: Object.assign({}, pickupLocation, { cityId, districtId }),
      },
    );
  };

  return [shippingMethodResp, getShippingMethods];
};
