import React from 'react';
import { useMutation, useQuery, useLazyQuery } from '@apollo/client';
import { mutation, query } from '@graphql';
import { cart } from '@slices';
import { useDispatch, useSelector } from 'react-redux';

// !TODO: trường hợp đang có đơn hàng chưa hoàn thành thì không cho tạo  cart

export const useCustomerCart = (reload) => {
  const dispatch = useDispatch();

  const cartId = useSelector((state) => state.cart?.cart_id);
  // Query customer carts
  const [queryCartItems, cartQueryResp] = useLazyQuery(
    query.CUSTOMER_CART_QUERY,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  // Mutation create empty cart
  const [createEmptyCart, createEmptyCartResp] = useMutation(
    mutation.CREATE_EMPTY_CART,
  );

  const updateCartItemsCache = (cache, { data }) => {
    const { customerCart } = cache.readQuery({
      query: query.CUSTOMER_CART_QUERY,
    });

    Logger.debug(customerCart, 'updateCache > cache ');
    Logger.debug(data, 'updateCache > resp');

    // cache.writeQuery({
    //   query: query.CUSTOMER_CART_QUERY,
    //   data: { customerCart: [] },
    // });
  };

  // Mutation update cart product
  const [updateCartItems, updateCartResp] = useMutation(
    mutation.UPDATE_CART_PRODUCT,
    {
      update: updateCartItemsCache,
    },
  );

  const updateAddProductsToCartCache = (
    cache,
    { data: { addProductsToCart } },
  ) => {};

  // Mutation add to cart
  const [addProductsToCart, addProductsToCartResp] = useMutation(
    mutation.ADD_PRODUCT_TO_CART,
    {
      update: updateAddProductsToCartCache,
    },
  );

  // Query customer cart
  // + nếu có sẽ dispatch cart id to redux,
  // + không có sẽ mutation create empty cart rồi dispatch cart id to redux
  React.useEffect(() => {
    // ! check to block request empty card
    if (cartId) return;

    if (cartQueryResp?.data) {
      const { customerCart } = cartQueryResp?.data;
      dispatch(cart.setCartId(customerCart?.id));
    } else {
      createEmptyCart();
    }
  }, [createEmptyCart, cartQueryResp?.data, dispatch, cartId]);

  // Mutation create empty cart --
  React.useEffect(() => {
    if (createEmptyCartResp?.data) {
      dispatch(cart.setCartId(createEmptyCartResp.data.createEmptyCart));
    }
  }, [dispatch, createEmptyCartResp?.data]);

  React.useEffect(() => {
    if (reload) queryCartItems();
  }, [queryCartItems, reload]);

  return {
    cart: cartQueryResp?.data,
    updateCart: updateCartItems,
    updateCartResp,
    addProductsToCart,
    addProductsToCartResp,
  };
};
