import { useLazyQuery } from '@apollo/client';
import { ORDERS_CUSTOMER } from '../gql';
import { app, account } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';

export const useOrderList = (onSuccess = () => {}) => {
  const dispatch = useDispatch();

  const { getOrderList, orderListResp } = useLazyQuery(ORDERS_CUSTOMER, {
    fetchPolicy: 'cache-and-network',
    onCompleted: (res) => {},
    onError: (error) => {},
  });

  return [orderListResp, getOrderList];
};
