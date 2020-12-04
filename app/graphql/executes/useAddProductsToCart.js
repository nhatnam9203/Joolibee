import { useLazyQuery, useMutation } from '@apollo/client';
import { ADD_PRODUCT_TO_CART } from '../gql';
import { account, app } from '@slices';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ANIMATION_DURATION = 800;

export const useAddProductsToCart = () => {
  const dispatch = useDispatch();
  const customerCart = useSelector((state) => state.account?.cart);

  // ADD PRODUCT TO CART
  const [addProductsToCart, response] = useMutation(ADD_PRODUCT_TO_CART, {
    // !! có nên lưu cart lại không, hay chỉ lưu số lượng rồi load lại mỗi lần view, hiện đang lưu
    onCompleted: (data) => {
      // Logger.debug(data, 'useAddProductsToCart data ');
      if (data?.addProductsToCart) {
        dispatch(account.updateCustomerCart(data?.addProductsToCart?.cart));
      }

      dispatch(app.hideLoading());
    },
  });

  React.useEffect(() => {
    // setTimeout(() => {
    // }, ANIMATION_DURATION + 100);
    // if (response.loading) {
    //   dispatch(app.showLoading());
    // } else {
    //   dispatch(app.hideLoading());
    // }
  }, [dispatch, response.loading]);

  const onAddProductsToCart = (params) => {
    if (!customerCart) {
      return;
    }
    Logger.debug(customerCart, 'customerCart');

    let { variables } = params;
    variables = Object.assign({}, variables, { cart_id: customerCart.id });
    Logger.debug(variables, 'variables');
    addProductsToCart({
      variables,
    });
  };

  return {
    addProductsToCart: onAddProductsToCart,
  };
};
