// import { mutation } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, save, StorageKey } from '@storage';
import { generate } from '@utils';
// import { useApolloClient } from '@apollo/client';

const KEY_CONSTANT = 'cart';

const initialState = {
  cart_detail: null,
  customerCart: null,
};

const updateCartProduct = createAsyncThunk(
  `${KEY_CONSTANT}/updateCartProduct`,
  async (input, client) => {
    //   const response = await client.mutate({
    //     mutation: mutation.UPDATE_CART_PRODUCT,
    //     variables: input,
    //   });
    return {};
    // return response;
  },
);

const cartSlice = createSlice({
  name: KEY_CONSTANT,
  initialState: initialState,
  reducers: {
    updateCustomerCart: (state, action) => {
      state.customerCart = action.payload;
    },
  },
  extraReducers: {
    // Update Cart Product
    [updateCartProduct.pending]: (state, action) => {
      Logger.info(action, 'updateCartProduct pending');
    },

    [updateCartProduct.fulfilled]: (state, action) => {
      Logger.info(action, 'updateCartProduct fulfilled');
    },

    [updateCartProduct.rejected]: (state, action) => {
      Logger.info(action, 'updateCartProduct rejected');
    },
  },
});

const { actions, reducer } = cartSlice;
module.exports = {
  reducer,
  actions: { updateCartProduct, ...actions },
};
