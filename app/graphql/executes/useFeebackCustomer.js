import { useMutation } from '@apollo/client';
import { FEEDBACK_CUSTOMER } from '../gql';
import { app } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';

export const useFeebackCustomer = () => {
  const dispatch = useDispatch();

  const [feedBackCustomer, response] = useMutation(FEEDBACK_CUSTOMER, {
    onError: (error) => {
      Logger.debug(error, 'feedBackCustomer error');
    },
  });

  const onFeedBackCustomer = (variables) => {
    return feedBackCustomer({
      variables,
    });
  };

  return {
    feedBackCustomer: onFeedBackCustomer,
    feedBackResp: response,
  };
};
