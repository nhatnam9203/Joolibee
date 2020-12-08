import { useLazyQuery } from '@apollo/client';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PICKUP } from '../gql';

export const useGetShippingMethod = () => {
  const pickupLocation = useSelector((state) => state.store.pickupLocation);
  const [storePickup, shippingMethodResp] = useLazyQuery(STORE_PICKUP, {
    fetchPolicy: 'no-cache',
  });

  const getShippingMethods = (input) => {
    const { cityId = 1, districtId = 5 } = pickupLocation || {};
    // sure la co gui len district va city
    storePickup(
      input ?? {
        variables: {
          cityId: parseInt(cityId),
          districtId: parseInt(districtId),
        },
      },
    );
  };

  return [shippingMethodResp, getShippingMethods];
};
