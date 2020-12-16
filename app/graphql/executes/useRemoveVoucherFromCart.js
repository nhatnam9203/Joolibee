import { useMutation } from '@apollo/client';
import { account, app } from '@slices';
import { useDispatch } from 'react-redux';
import { REMOVE_VOUCHER_TO_CART } from '../gql';

/**
 *
 */

export const useRemoveVoucherFromCart = () => {
  const dispatch = useDispatch();

  const [removeVoucherFromCart, resp] = useMutation(REMOVE_VOUCHER_TO_CART, {
    onCompleted: (data) => {
      dispatch(app.hideLoading());
      if (data?.removeVoucherFromCart) {
        dispatch(account.updateCustomerCart(data?.removeVoucherFromCart?.cart));
      }
    },
    onError: () => {
      dispatch(app.hideLoading());
    },
  });

  const removeVoucher = (variables) => {
    dispatch(app.showLoading());
    removeVoucherFromCart(variables);
  };

  return [resp, removeVoucher];
};
