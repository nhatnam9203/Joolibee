import { useMutation } from '@apollo/client';
import { CANCEL_ORDER } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';

export const useCancelOrder = (onSuccess = () => {}) => {
  const dispatch = useDispatch();

  const [cancelOrder, response] = useMutation(CANCEL_ORDER, {
    onCompleted: (res) => {
      console.log('res?.cancelOrder', res?.cancelOrder);
      if (res?.order_cancel) {
        dispatch(app.hideLoading());
        onSuccess();
      }
    },
    onError: (error) => {
      console.log('err', error);
    },
  });

  const onCancelOrder = (orderId) => {
    cancelOrder({
      variables: {
        orderId,
      },
    });
  };

  return {
    cancelOrder: onCancelOrder,
    cancelOrderResp: response,
  };
};
