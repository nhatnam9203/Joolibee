import { useMutation } from '@apollo/client';
import { REDEEM_POINT_CUSTOMER, CUSTOMER_CART_QUERY } from '../gql';

import { app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useRedeemPoint = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  const [redeemCustomerPoint, response] = useMutation(REDEEM_POINT_CUSTOMER, {
    onCompleted: (data) => {
      Logger.debug(data, 'useCustomerPoint');
      if (data?.useCustomerPoint) {
        dispatch(app.hideLoading());
      }
    },
  });

  const onUseCustomerPoint = (redeemPoint = 0) => {
    if (!customerCart) {
      return;
    }
    // let redeemCustomerPoint = useCustomerPoint;

    return redeemCustomerPoint({
      variables: {
        cart_id: customerCart.id,
        redeemPoint,
      },
      awaitRefetchQueries: true,
      refetchQueries: [{ query: CUSTOMER_CART_QUERY }],
    });
  };

  return {
    redeemCustomerPoint: onUseCustomerPoint,
    redeemCustomerPointResp: response,
  };
};
