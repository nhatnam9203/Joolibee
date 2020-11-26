import { useMutation } from '@apollo/client';
import { SET_ORDER_SHIPPING_ADDRESS, SET_ORDER_BILLING_ADDRESS } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSetShippingAddress = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  const [setShippingAddressesOnCart, response] = useMutation(
    SET_ORDER_SHIPPING_ADDRESS,
    {
      onCompleted: (data) => {
        Logger.debug(data, 'setShippingAddressesOnCart');
        if (data?.setShippingAddressesOnCart) {
          dispatch(app.hideLoading());
        }
      },
    },
  );

  // const [setBillingAddressOnCart, {}] = useMutation(SET_ORDER_BILLING_ADDRESS, {
  //   onCompleted: (data) => {
  //     Logger.debug(data, 'setShippingAddressesOnCart');
  //     if (data?.setShippingAddressesOnCart) {
  //       dispatch(app.hideLoading());
  //     }
  //   },
  // });

  const onSetShippingAddress = (customer_address_id) => {
    if (!customerCart) {
      return;
    }

    setShippingAddressesOnCart({
      variables: {
        cart_id: customerCart.id,
        shipping_addresses: [{ customer_address_id }],
        // billing_address: [{ customer_address_id }],
      },
    });
  };

  return {
    setShippingAddressesOnCart: onSetShippingAddress,
    responseShipping: response,
  };
};
