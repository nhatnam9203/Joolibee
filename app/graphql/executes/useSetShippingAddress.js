import { useMutation } from '@apollo/client';
import { GEX } from '@graphql';
import { useDispatch } from 'react-redux';
import { SET_ORDER_SHIPPING_ADDRESS } from '../gql';

export const useSetShippingAddress = (callBack = () => {}) => {
  const dispatch = useDispatch();
  // const customerCart = useSelector((state) => state.account?.cart);
  const [customerCart, getCustomerCart] = GEX.useGetCustomerCart();
  // const [customerCart, getCheckOutCart] = GEX.useGetCheckOutCart();

  const [setShippingAddressesOnCart, shippingAddressResp] = useMutation(
    SET_ORDER_SHIPPING_ADDRESS,
    {
      onCompleted: (data) => {
        if (data?.setShippingAddressesOnCart) {
          getCustomerCart();
          if (typeof callBack === 'function') {
            callBack();
          }
        }
      },
    },
  );

  const setShippingAddress = (params) => {
    if (!customerCart) {
      return;
    }
    let { variables } = params;
    variables = Object.assign({}, variables, { cart_id: customerCart.id });
    return setShippingAddressesOnCart({
      ...params,
      variables,
    });
  };

  return [shippingAddressResp, setShippingAddress];
};
