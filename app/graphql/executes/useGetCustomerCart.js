import { useLazyQuery } from '@apollo/client';
import { account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMER_CART_QUERY } from '../gql';

/**
 * !! nếu không có cardId sẽ query tìm customer cart, nếu ko tìm thấy sẽ tạo empty cart
 *
 */

export const useGetCustomerCart = () => {
  const dispatch = useDispatch();

  // CREATE EMPTY CART
  // const [createEmptyCart, createEmptyCartResp] = useMutation(CREATE_EMPTY_CART);

  // GET CUSTOMER CARTS
  const [getCustomerCart, customerCartResp] = useLazyQuery(
    CUSTOMER_CART_QUERY,
    {
      fetchPolicy: 'only-network',
      //   onCompleted: (data) => {
      //     Logger.debug(data, 'get customer info complete');
      //   },
    },
  );

  const customerCart = useSelector((state) => state.account?.cart);

  React.useEffect(() => {
    if (!customerCart) {
      getCustomerCart();
    }
  }, [customerCart, getCustomerCart]);

  React.useEffect(() => {
    if (customerCartResp.data?.customerCart) {
      dispatch(account.updateCustomerCart(customerCartResp.data?.customerCart));
    }
  }, [customerCartResp, dispatch]);

  return {
    cart: customerCart,
  };
};
