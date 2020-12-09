import { useMutation } from '@apollo/client';
import { account } from '@slices';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_CART_PRODUCT } from '../gql';

/**
 *
 */

export const useUpdateCustomerCart = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  // UPDATE CART
  const [updateCartItems, updateCartResp] = useMutation(UPDATE_CART_PRODUCT, {
    onCompleted: (data) => {
      if (data?.updateCartItems) {
        dispatch(account.updateCustomerCart(data?.updateCartItems?.cart));
      }
    },
  });

  const updateCart = (params) => {
    if (!customerCart) {
      return;
    }

    let { variables } = params;
    variables = Object.assign({}, variables, { cart_id: customerCart.id });
    updateCartItems({ variables });
  };

  return [updateCartResp, updateCart];
};
