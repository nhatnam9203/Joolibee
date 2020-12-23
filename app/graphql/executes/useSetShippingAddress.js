import { useMutation, useLazyQuery } from '@apollo/client';
import { GEX } from '@graphql';
import { useDispatch } from 'react-redux';
import { SET_ORDER_SHIPPING_ADDRESS, SEARCH_STORE_BY_ADDRESS } from '../gql';
import { account, store } from '@slices';
import { geocodeAddress } from '@location';
import { format } from '@utils';

export const useSetShippingAddress = (callBack = () => {}) => {
  const dispatch = useDispatch();
  // const customerCart = useSelector((state) => state.account?.cart);
  const [customerCart] = GEX.useGetCustomerCart();
  // const [customerCart, getCheckOutCart] = GEX.useGetCheckOutCart();

  const [searchStore] = useMutation(SEARCH_STORE_BY_ADDRESS, {
    onCompleted: (data) => {
      Logger.debug(data, '=========searchStore data');
      if (data?.searchStore) {
        dispatch(store.setPickupStore(data?.searchStore?.area_data));
      }
    },
  });

  const [setShippingAddressesOnCart, shippingAddressResp] = useMutation(
    SET_ORDER_SHIPPING_ADDRESS,
    {
      onCompleted: async (data) => {
        if (data?.setShippingAddressesOnCart) {
          if (typeof callBack === 'function') {
            callBack();
          }

          // cap nhat lai shipping address in customer cart
          dispatch(
            account.updateCustomerCart(data?.setShippingAddressesOnCart?.cart),
          );

          // get lai stores theo shipping address
          const shippingAddress = data?.setShippingAddressesOnCart?.cart?.shipping_addresses?.find(
            Boolean,
          );

          await requestStoreFromShippingAddress(shippingAddress);
        }
      },
    },
  );

  const requestStoreFromShippingAddress = async (address) => {
    if (address) {
      const fullAddress = format.addressFull(address);
      const { data, status } = await geocodeAddress(fullAddress);
      if (data) {
        let input = {
          street_number: '',
          route: '',
          locality: '',
          sublocality_level_1: '',
          administrative_area_level_1: '',
          administrative_area_level_2: '',
          country: 'Việt Nam',
          ward: '',
          neighborhood: '',
          order_amount: 0,
        };
        const { address_components = [], geometry = {}, place_id } = data;
        address_components.forEach((item) => {
          const type = item.types?.find(Boolean);
          input[type] = item.long_name;
        });

        // dispatch location ship
        const { location } = geometry;
        dispatch(
          store.setShippingLocation({
            latitude: location?.lat,
            longitude: location?.lng,
          }),
        );

        searchStore({ variables: input });
      }
    }
  };

  const setShippingAddress = (params) => {
    if (!customerCart) {
      return;
    }

    let { variables } = params;
    variables = Object.assign({}, variables, { cart_id: customerCart.id });
    Logger.debug(params, '=====> params');

    Logger.debug(variables, '=====> variables');

    return setShippingAddressesOnCart({
      variables,
    });
  };

  return [shippingAddressResp, setShippingAddress];
};
