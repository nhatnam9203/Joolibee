import { useLazyQuery, useMutation } from '@apollo/client';
import {
  CUSTOMER_CART_QUERY,
  CREATE_EMPTY_CART,
  ADD_PRODUCT_TO_CART,
  UPDATE_CART_PRODUCT,
} from '../gql';
import { cart, account } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCustomerCart = (createCartId = false) => {
  const dispatch = useDispatch();

  // CREATE EMPTY CART
  const [createEmptyCart, createEmptyCartResp] = useMutation(
    CREATE_EMPTY_CART,
    {},
  );

  // GET CUSTOMER CART
  const [getCustomerCart, customerCartResp] = useLazyQuery(
    CUSTOMER_CART_QUERY,
    {
      fetchPolicy: 'only-network',
      //   onCompleted: (data) => {
      //     Logger.debug(data, 'get customer info complete');
      //   },
    },
  );

  // ADD PRODUCT TO CART
  const [addProductsToCart, addProductsToCartResp] = useMutation(
    ADD_PRODUCT_TO_CART,
    {},
  );

  // UPDATE CART
  const [updateCartItems, updateCartResp] = useMutation(
    UPDATE_CART_PRODUCT,
    {},
  );

  const currentCartId = useSelector((state) => state.account?.user?.cartId);
  const customerCart = useSelector((state) => state.cart?.customerCart);

  // Nêu tìm không thấy cart id thì sẽ tạo
  React.useEffect(() => {
    if (!currentCartId && createCartId) {
      createEmptyCart();
    }
  }, [createEmptyCart, currentCartId, createCartId]);

  // Cập nhật cart id
  React.useEffect(() => {
    if (createEmptyCartResp?.data) {
      dispatch(account.updateCustomerCartId(createEmptyCartResp?.data));
    }
  }, [createEmptyCartResp?.data, dispatch]);

  // Cập nhật customer cart
  React.useEffect(() => {
    if (customerCartResp.data?.customerCart) {
      dispatch(cart?.updateCustomerCart(customerCartResp.data?.customerCart));
    }
  }, [customerCartResp.data, dispatch]);

  // Request cart
  React.useEffect(() => {
    if (currentCartId && customerCart?.cart_id !== currentCartId) {
      getCustomerCart();
    }
  }, [getCustomerCart, customerCart, currentCartId]);

  return {
    getCustomerCart,
    addProductsToCart,
    updateCartItems,
    cart: customerCart,
    updateCartResp,
  };
};
