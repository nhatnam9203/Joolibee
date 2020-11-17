import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { mutation, query } from '@graphql';
import { cart } from '@slices';
import { useDispatch } from 'react-redux';

// !TODO: trường hợp đang có đơn hàng chưa hoàn thành thì không cho tạo  cart
export const useCustomerCart = () => {
  const dispatch = useDispatch();
  // get customer cart id
  const customerCartData = useQuery(query.CUSTOMER_CART_QUERY, {
    fetchPolicy: 'cache-first',
  });

  // Mutation create empty cart
  const [createEmptyCart, response] = useMutation(mutation.CREATE_EMPTY_CART);

  React.useEffect(() => {
    if (customerCartData?.data) {
      const { customerCart } = customerCartData?.data;
      dispatch(cart.setCartId(customerCart?.id));
    } else {
      createEmptyCart();
    }
  }, [createEmptyCart, customerCartData?.data, dispatch]);

  React.useEffect(() => {
    if (response?.data) {
      Logger.info(response?.data, 'response >> createEmptyCart');
      dispatch(cart.setCartId(response.data.createEmptyCart));
    }
  }, [dispatch, response?.data]);
  // Mutation create empty cart --
  return { cart: customerCartData?.data };
};
