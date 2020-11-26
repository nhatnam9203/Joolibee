import { useMutation } from '@apollo/client';
import { SET_ORDER_PAYMENT_METHOD } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSetPaymentMethod = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);
  console.log('customerCart', JSON.stringify(customerCart));

  const [setPaymentMethodOnCart] = useMutation(SET_ORDER_PAYMENT_METHOD, {
    onCompleted: (data) => {
      Logger.debug(data, 'setPaymentMethodOnCart');
      if (data?.setPaymentMethodOnCart) {
        dispatch(app.hideLoading());
      }
    },
  });

  const onSetPaymentMethodOnCart = () => {
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

  return {
    setPaymentMethodOnCart: onSetPaymentMethodOnCart,
    // responseShipping: response,
  };
};
