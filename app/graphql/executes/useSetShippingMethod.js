import { useMutation } from '@apollo/client';
import { SET_ORDER_SHIPPING_METHOD } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSetShippingMethodsOnCart = () => {
  const customerCart = useSelector((state) => state.account?.cart);

  const [setShippingMethodsOnCart, shippingMethodResp] = useMutation(
    SET_ORDER_SHIPPING_METHOD,
  );

  const setShippingMethods = (code, storeId) => {
    if (!customerCart) {
      return;
    }

    setShippingMethodsOnCart({
      variables: {
        cart_id: customerCart.id,
        shipping_methods: [
          {
            carrier_code: code,
            method_code: code,
            // eslint-disable-next-line radix
            ...(storeId && { pickup_store: parseInt(storeId) }),
          },
        ],
      },
    });
  };

  return [shippingMethodResp, setShippingMethods];
};
