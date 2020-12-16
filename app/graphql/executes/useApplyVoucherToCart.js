import { useMutation } from '@apollo/client';
import { account, app } from '@slices';
import { useDispatch } from 'react-redux';
import { APPLY_VOUCHER_TO_CART } from '../gql';

/**
 *
 */

export const useApplyVoucherToCart = () => {
  const dispatch = useDispatch();
  const [applyVoucherToCart, resp] = useMutation(APPLY_VOUCHER_TO_CART, {
    onCompleted: (data) => {
      dispatch(app.hideLoading());

      if (data?.applyVoucherToCart) {
        dispatch(account.updateCustomerCart(data?.applyVoucherToCart?.cart));
      }
    },
    onError: () => {
      dispatch(app.hideLoading());
    },
  });

  const addVoucherToCart = (variables) => {
    dispatch(app.showLoading());
    applyVoucherToCart(variables);
  };

  return [resp, addVoucherToCart];
};
