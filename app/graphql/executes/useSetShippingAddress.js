import { useMutation } from '@apollo/client';
import { SET_ORDER_SHIPPING_ADDRESS } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GEX } from '@graphql';

export const useSetShippingAddress = (callBack = () => {}) => {
  const dispatch = useDispatch();
  // const customerCart = useSelector((state) => state.account?.cart);
  const [customerCart, getCustomerCart] = GEX.useGetCustomerCart();

  const [setShippingAddressesOnCart, shippingAddressResp] = useMutation(
    SET_ORDER_SHIPPING_ADDRESS,
    {
      onCompleted: (data) => {
        Logger.debug(data, 'setShippingAddressesOnCart');
        if (data?.setShippingAddressesOnCart) {
          callBack();
        }
      },
    },
  );

  const setShippingAddress = (params) => {
    if (!customerCart) {
      return;
    }
    let { variables } = params;
    variables = Object.assign({}, variables, { cart_id: customerCart.id });
    return setShippingAddressesOnCart({
      ...params,
      variables,
    });
  };

  return [shippingAddressResp, setShippingAddress];
};
