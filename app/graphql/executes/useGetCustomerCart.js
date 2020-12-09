import { useLazyQuery } from '@apollo/client';
import { account, app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMER_CART_QUERY } from '../gql';

export const useGetCustomerCart = (onCompleted = () => {}) => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  // GET CUSTOMER CARTS
  const [getCustomerCart, getCustomerCartResp] = useLazyQuery(
    CUSTOMER_CART_QUERY,
    {
      fetchPolicy: 'no-cache',
      onCompleted,
      onError: () => {
        dispatch(app.hideLoading());
      },
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
      // Logger.debug(
      //   getCustomerCartResp.data,
      //   'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx customer cart update and dispatch redux',
      // );

      dispatch(
        account.updateCustomerCart(getCustomerCartResp.data?.customerCart),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCustomerCartResp]);

  return [customerCart, getCustomerCart];
};
