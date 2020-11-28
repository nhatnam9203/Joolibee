import { useMutation } from '@apollo/client';
import { RE_ORDER_CART } from '../gql';
import { app, account } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';

export const useReOrderCart = (onSuccess = () => {}) => {
  const dispatch = useDispatch();

  const [reorderItems, response] = useMutation(RE_ORDER_CART, {
    onCompleted: (res) => {
      if (res?.reorderItems?.cart) {
        dispatch(account.updateCustomerCart(res?.reorderItems?.cart));
        dispatch(app.hideLoading());
        onSuccess();
      }
    },
    onError: (error) => {
      console.log('err', error);
    },
  });

  const onReOrderCart = (orderNumber) => {
    console.log(orderNumber);
    reorderItems({
      variables: {
        orderNumber,
      },
    });
  };

  return {
    reorderItems: onReOrderCart,
    reOrderCartResp: response,
  };
};
