import { useMutation } from '@apollo/client';
import { RE_ORDER_CART, CUSTOMER_CART_QUERY } from '../gql';
import { app, account } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';

export const useReOrderCart = (onSuccess = () => {}) => {
  const dispatch = useDispatch();

  const [reorderItems, reOrderCartResp] = useMutation(RE_ORDER_CART, {
    refetchQueries: [{ query: CUSTOMER_CART_QUERY }],

    onCompleted: (res) => {
      if (res?.reorderItems?.cart) {
        // dispatch(account.resetCustomerCart(res?.reorderItems?.cart));
        dispatch(app.hideLoading());
        onSuccess();
      }
    },
    onError: (error) => {
      dispatch(app.hideLoading());
    },
  });

  React.useEffect(() => {
    if (reOrderCartResp.data?.reorderItems?.cart) {
      dispatch(
        account.updateCustomerCart(reOrderCartResp.data?.reorderItems?.cart),
      );
    }
  }, [dispatch, reOrderCartResp]);

  const reOrderCart = (orderNumber) => {
    dispatch(app.showLoading());

    reorderItems({
      variables: {
        orderNumber,
      },
    });
  };

  return [reOrderCart, reOrderCartResp];
};
