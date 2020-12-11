import { useMutation } from '@apollo/client';
import { CANCEL_ORDER } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';

export const useCancelOrder = (onSuccess = () => {}) => {
  const dispatch = useDispatch();

  const [cancelOrderCustomer, response] = useMutation(CANCEL_ORDER, {
    onCompleted: (res) => {
      if (res?.cancelOrderCustomer) {
        dispatch(app.hideLoading());
        onSuccess();
      }
    },
    onError: (error) => {
      Logger.debug(error, 'useCancelOrder error');
    },
  });

  const onCancelOrder = (orderId) => {
    cancelOrderCustomer({
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
