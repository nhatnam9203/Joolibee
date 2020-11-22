import { useLazyQuery } from '@apollo/client';
import { account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMER_CART_QUERY } from '../gql';

export const useGetCustomerCart = () => {
  const dispatch = useDispatch();

  // CREATE EMPTY CART
  // const [createEmptyCart, createEmptyCartResp] = useMutation(CREATE_EMPTY_CART);

  // GET CUSTOMER CARTS
  const [getCustomerCart, getCustomerCartResp] = useLazyQuery(
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerCart]);

  React.useEffect(() => {
    if (getCustomerCartResp.data?.customerCart) {
      dispatch(
        account.updateCustomerCart(getCustomerCartResp.data?.customerCart),
      );
    }
  }, [getCustomerCartResp, dispatch]);

  return {
    cart: customerCart,
    getCustomerCartResp,
  };
};
