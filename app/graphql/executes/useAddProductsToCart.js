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

  // ADD PRODUCT TO CART
  const [addProductsToCart, addProductsToCartResp] = useMutation(
    ADD_PRODUCT_TO_CART,
    {},
  );

  return {
    addProductsToCart,
    addProductsToCartResp,
  };
};
