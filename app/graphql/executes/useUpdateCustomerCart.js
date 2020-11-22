import { useLazyQuery, useMutation } from '@apollo/client';
import { UPDATE_CART_PRODUCT } from '../gql';
import { account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 *
 */

export const useUpdateCustomerCart = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  // UPDATE CART
  const [updateCartItems, updateCartResp] = useMutation(UPDATE_CART_PRODUCT, {
    onCompleted: (data) => {
      if (data?.updateCartItems) {
        dispatch(account.updateCustomerCart(data?.updateCartItems?.cart));
      }
    },
  });

  const onupdateCartItems = (params) => {
    if (!customerCart) {
      return;
    }

    let { variables } = params;
    variables = Object.assign({}, variables, { cart_id: customerCart.id });
    updateCartItems({ variables });
  };

  return {
    updateCartItems: onupdateCartItems,
    updateCartResp,
  };
};
