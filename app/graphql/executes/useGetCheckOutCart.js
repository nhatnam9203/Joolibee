import { useLazyQuery } from '@apollo/client';
import { account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CART_DETAIL } from '../gql';

export const useGetCheckOutCart = () => {
  const dispatch = useDispatch();

  const customerCart = useSelector((state) => state.account?.cart);

  // GET CUSTOMER CARTS
  const [getCheckOutCart, getCheckOutCartResp] = useLazyQuery(CART_DETAIL, {
    fetchPolicy: 'only-network',
    //   onCompleted: (data) => {
    //     Logger.debug(data, 'get customer info complete');
    //   },
  });

  const onCheckOutCart = () => {
    if (customerCart) {
      getCheckOutCart({ variables: { cartId: customerCart.id } });
    }
  };

  return {
    getCheckOutCart: onCheckOutCart,
    getCheckOutCartResp,
  };
};
