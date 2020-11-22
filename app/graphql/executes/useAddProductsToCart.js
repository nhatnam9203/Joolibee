import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_PRODUCT_TO_CART } from '../gql';
import { account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

/**
 *
 */

export const useAddProductsToCart = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  // ADD PRODUCT TO CART
  const [addProductsToCart, addProductsToCartResp] = useMutation(
    ADD_PRODUCT_TO_CART,
    {
      onCompleted: (data) => {
        if (data?.addProductsToCart) {
          dispatch(account.updateCustomerCart(data?.addProductsToCart?.cart));
        }
      },
    },
  );

  const onAddProductsToCart = (params) => {
    if (!customerCart) return;

    let { variables } = params;
    variables = Object.assign({}, variables, { cart_id: customerCart.id });

    addProductsToCart({
      variables,
    });
  };

  return {
    addProductsToCart: onAddProductsToCart,
    addProductsToCartResp,
  };
};
