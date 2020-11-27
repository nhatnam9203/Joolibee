import { useMutation } from '@apollo/client';
import { SET_ORDER_BILLING_ADDRESS } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSetBillingAddress = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  const [setBillingAddressOnCart, response] = useMutation(
    SET_ORDER_BILLING_ADDRESS,
    {
      onCompleted: (data) => {
        Logger.debug(data, 'setBillingAddressesOnCart');
        if (data?.setBillingAddressOnCart) {
          dispatch(app.hideLoading());
        }
      },
    },
  );

  const onSetBillingAddress = (customer_address_id) => {
    if (!customerCart) {
      return;
    }

    setBillingAddressOnCart({
      variables: {
        cart_id: customerCart.id,
        billing_address: { customer_address_id },
      },
    });
  };

  return {
    setBillingAddressOnCart: onSetBillingAddress,
    setBillingAddressOnCartResp: response,
  };
};
