import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_PRODUCT_TO_CART } from '../gql';
import { account, app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCustomerCart } from './useGetCustomerCart';
const ANIMATION_DURATION = 800;

export const useAddProductsToCart = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);
  const [, getCustomerCart] = useGetCustomerCart(); // load customer cart

  // ADD PRODUCT TO CART
  const [addBundleProductsToCart, response] = useMutation(ADD_PRODUCT_TO_CART, {
    // !! có nên lưu cart lại không, hay chỉ lưu số lượng rồi load lại mỗi lần view, hiện đang lưu
    onCompleted: (data) => {
      // Logger.debug(data, 'useAddProductsToCart data ');
      if (data?.addBundleProductsToCart) {
        dispatch(
          account.updateCustomerCart(data?.addBundleProductsToCart?.cart),
        );
      }
      // getCustomerCart();
      dispatch(app.hideLoading());
    },
  });

  // React.useEffect(() => {
  //   setTimeout(() => {
  //   }, ANIMATION_DURATION + 100);
  //   if (response.loading) {
  //     dispatch(app.showLoading());
  //   } else {
  //     dispatch(app.hideLoading());
  //   }
  // }, [dispatch, response.loading]);

  const onAddProductsToCart = (params) => {
    if (!customerCart) {
      return;
    }
    // Logger.debug(customerCart, 'customerCart');
    dispatch(app.showLoading());

    let { variables } = params;
    variables = Object.assign({}, variables, { cart_id: customerCart.id });
    // Logger.debug(variables, 'variables');
    addBundleProductsToCart({
      variables,
    });
  };

  return {
    addProductsToCart: onAddProductsToCart,
  };
};
