import { useMutation } from '@apollo/client';
import { SET_ORDER_PAYMENT_METHOD } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSetPaymentMethod = () => {
  const customerCart = useSelector((state) => state.account?.cart);

  const [setPaymentMethodOnCart, paymentMethodResp] = useMutation(
    SET_ORDER_PAYMENT_METHOD,
  );

  const setPaymentMethod = () => {
    if (!customerCart) {
      return;
    }

    setPaymentMethodOnCart({
      variables: {
        cart_id: customerCart.id,
        payment_method: {
          code: 'cashondelivery',
        },
      },
    });
  };

  return [paymentMethodResp, setPaymentMethod];
};
