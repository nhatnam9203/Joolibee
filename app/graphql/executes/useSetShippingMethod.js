import { useMutation } from '@apollo/client';
import { SET_ORDER_SHIPPING_METHOD } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSetShippingMethodsOnCart = () => {
  const customerCart = useSelector((state) => state.account?.cart);

  const [setShippingMethodsOnCart, response] = useMutation(
    SET_ORDER_SHIPPING_METHOD,
  );

  const onSetShippingMethodsOnCart = (code) => {
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
          },
        ],
      },
    });
  };

  return {
    setShippingMethod: onSetShippingMethodsOnCart,
    setShippingMethodResp: response,
  };
};
