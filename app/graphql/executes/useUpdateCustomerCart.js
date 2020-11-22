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

  // UPDATE CART
  const [updateCartItems, updateCartResp] = useMutation(
    UPDATE_CART_PRODUCT,
    {},
  );

  return {
    updateCartItems,
    updateCartResp,
  };
};
