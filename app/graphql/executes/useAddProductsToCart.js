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
      Logger.debug(data, 'addProductsToCart');
      if (data?.addProductsToCart) {
        dispatch(app.hideLoading());
        dispatch(account.updateCustomerCart(data?.addProductsToCart?.cart));
      }
    },
  });

  React.useEffect(() => {
    setTimeout(() => {
      if (response.loading) {
        dispatch(app.showLoading());
      }
    }, ANIMATION_DURATION + 100);
  }, [dispatch, response.loading]);

  const onAddProductsToCart = (params) => {
    if (!customerCart) {
      return;
    }

    let { variables } = params;
    variables = Object.assign({}, variables, { cart_id: customerCart.id });
    setTimeout(() => {
      dispatch(
        account.addCustomerCartQuantity(variables.cart_items[0]?.quantity),
      );
    }, ANIMATION_DURATION);

    addProductsToCart({
      variables,
    });
  };

  return {
    addProductsToCart: onAddProductsToCart,
  };
};
