import { useLazyQuery, useMutation } from '@apollo/client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CART_DETAIL, CREATE_EMPTY_CART } from '../gql';
import { account, app } from '@slices';

export const useGetCheckOutCart = (onCompleted = () => {}) => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  const [getCartDetail, checkOutCartResp] = useLazyQuery(CART_DETAIL, {
    fetchPolicy: 'no-cache',
    onCompleted,
    onError: () => {
      dispatch(app.hideLoading());
    },
  });

  const [createEmptyCart, createCartResp] = useMutation(CREATE_EMPTY_CART, {
    onCompleted: (data) => {
      dispatch(account.setCustomerCart({ id: data?.createEmptyCart }));
      getCartDetail({ variables: { cartId: data?.createEmptyCart } });
    },
  });

  React.useEffect(() => {
    if (checkOutCartResp.data?.cart) {
      dispatch(account.updateCustomerCart(checkOutCartResp.data?.cart));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkOutCartResp?.data]);

  const getCheckOutCart = (renew = false) => {
    if (customerCart?.id && !renew) {
      getCartDetail({ variables: { cartId: customerCart?.id } });
    } else {
      createEmptyCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return [customerCart, getCheckOutCart];
};
