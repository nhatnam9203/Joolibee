import { useLazyQuery } from '@apollo/client';
import { account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMER_CART_QUERY } from '../gql';

export const useGetCustomerCart = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  // GET CUSTOMER CARTS
  const [getCustomerCart, getCustomerCartResp] = useLazyQuery(
    CUSTOMER_CART_QUERY,
    {
      fetchPolicy: 'no-cache',
    },
  );

  // React.useEffect(() => {
  //   if (!customerCart) {
  //     getCustomerCart();
  //     Logger.debug('getCustomerCart', 'useGetCustomerCart');
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  React.useEffect(() => {
    if (getCustomerCartResp.data?.customerCart) {
      Logger.debug(
        'xxxxxx customer cart update and dispatch redux xxxxxxx',
        'useGetCustomerCart',
      );

      dispatch(
        account.updateCustomerCart(getCustomerCartResp.data?.customerCart),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCustomerCartResp?.data]);

  return [customerCart, getCustomerCart];
};
