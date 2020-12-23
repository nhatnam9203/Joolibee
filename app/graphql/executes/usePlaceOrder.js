import { useMutation } from '@apollo/client';
import { app } from '@slices';
import { useDispatch, useSelector } from 'react-redux';
import { PLACE_ORDER, CUSTOMER_CART_QUERY, ORDERS_CUSTOMER } from '../gql';
import React from 'react';

export const usePlaceOrder = (onCompleted) => {
  const dispatch = useDispatch();

  const [placeOrder, placeOrderResp] = useMutation(PLACE_ORDER, {
    fetchPolicy: 'no-cache',
    // refetchQueries: [{ query: CUSTOMER_CART_QUERY }],
    // awaitRefetchQueries: true,
    onCompleted: (res) => {
      dispatch(app.hideLoading());
      if (typeof onCompleted === 'function') {
        onCompleted(res?.placeOrder);
      }
    },
    onError: (error) => {
      dispatch(app.hideLoading());
    },
  });

  const orderSubmit = async (params) => {
    dispatch(app.showLoading());
    placeOrder(params);
  };

  return [placeOrderResp, orderSubmit];
};
