import { useLazyQuery } from '@apollo/client';
import React from 'react';
import { useSelector } from 'react-redux';
import { CART_DETAIL } from '../gql';

export const useGetCheckOutCart = () => {
  const [getCheckOutCart, getCheckOutCartResp] = useLazyQuery(CART_DETAIL, {
    fetchPolicy: 'no-cache',
    //   onCompleted: (data) => {
    //     Logger.debug(data, 'get customer info complete');
    //   },
  });

  // GET CUSTOMER CARTS
  const customerCart = useSelector((state) => state.account?.cart);

  const onCheckOutCart = React.useCallback(() => {
    if (customerCart?.id) {
      getCheckOutCart({ variables: { cartId: customerCart?.id } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerCart?.id]);

  return {
    getCheckOutCartResp,
    getOrderCart: onCheckOutCart,
  };
};
