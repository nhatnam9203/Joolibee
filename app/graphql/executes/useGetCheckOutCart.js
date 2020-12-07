import { useLazyQuery, useMutation } from '@apollo/client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CART_DETAIL, CREATE_EMPTY_CART } from '../gql';
import { account, app } from '@slices';

export const useGetCheckOutCart = (onCompleted = () => {}) => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  const [createEmptyCart, createCartResp] = useMutation(CREATE_EMPTY_CART, {
    onCompleted: (data) => {
      Logger.debug(data, '====> createEmptyCart data');
      dispatch(account.updateCustomerCart({ id: data?.createEmptyCart }));
    },
  });

  const [getCartDetail, checkOutCartResp] = useLazyQuery(CART_DETAIL, {
    fetchPolicy: 'no-cache',
    onCompleted,
    onError: () => {
      dispatch(app.hideLoading());
    },
  });

  React.useEffect(() => {
    if (checkOutCartResp.data?.cart) {
      Logger.debug(
        checkOutCartResp.data,
        'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx customer cart update and dispatch redux',
      );

      dispatch(account.updateCustomerCart(checkOutCartResp.data?.cart));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkOutCartResp?.data]);

  const getCheckOutCart = React.useCallback(() => {
    if (customerCart?.id) {
      getCartDetail({ variables: { cartId: customerCart?.id } });
    } else {
      createEmptyCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerCart]);

  return [customerCart, getCheckOutCart];
};
