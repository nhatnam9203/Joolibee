import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import { SET_ORDER_SHIPPING_METHOD } from '../gql';

export const useSetShippingMethodsOnCart = () => {
  const customerCart = useSelector((state) => state.account?.cart);

  const [setShippingMethodsOnCart, shippingMethodResp] = useMutation(
    SET_ORDER_SHIPPING_METHOD,
  );

  const setShippingMethods = (code, storeId, notes) => {
    if (!customerCart) {
      return;
    }
    setShippingMethodsOnCart({
      variables: {
        cart_id: customerCart.id,
        shipping_methods: [
          {
            carrier_code: code,
            method_code: code,
            // eslint-disable-next-line radix
            ...(storeId && { restaurant_id: parseInt(storeId) }),
          },
        ],
        ...notes,
      },
    });
  };

  return [shippingMethodResp, setShippingMethods];
};
