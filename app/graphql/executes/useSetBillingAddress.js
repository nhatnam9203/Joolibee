import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { SET_ORDER_BILLING_ADDRESS } from '../gql';

export const useSetBillingAddress = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  const [setBillingAddressOnCart, billingAddressResp] = useMutation(
    SET_ORDER_BILLING_ADDRESS,
    {},
  );

  const setBillingAddress = (customer_address_id) => {
    if (!customerCart) {
      return;
    }

    setBillingAddressOnCart({
      variables: {
        cart_id: customerCart.id,
        billing_address: { customer_address_id },
      },
    });
  };

  return [billingAddressResp, setBillingAddress];
};
