import { useLazyQuery } from '@apollo/client';
import { account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CUSTOMER_CART_QUERY } from '../gql';

export const useGetCustomerCart = () => {
  const dispatch = useDispatch();

  // const [createEmptyCart] = useMutation(CREATE_EMPTY_CART);

  // GET CUSTOMER CARTS
  const [getCustomerCart, getCustomerCartResp] = useLazyQuery(
    CUSTOMER_CART_QUERY,
    {
      fetchPolicy: 'cache-and-network',
      //   onCompleted: (data) => {
      //     Logger.debug(data, 'get customer info complete');
      //   },
    },
  );

  const customerCart = useSelector((state) => state.account?.cart);

  React.useEffect(() => {
    getCustomerCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (getCustomerCartResp.data?.customerCart) {
      dispatch(
        account.updateCustomerCart(getCustomerCartResp.data?.customerCart),
      );
    }
  }, [getCustomerCartResp.data, dispatch]);

  return {
    cart: customerCart,
    getCustomerCartResp,
  };
};
