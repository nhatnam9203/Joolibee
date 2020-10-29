import { graphQlClient, mutation, query } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, save, StorageKey } from '@storage';
import { generate } from '@utils';
import { useApolloClient } from '@apollo/client';

const KEY_CONSTANT = 'cart';

const initialState = {
  cart_id: null,
  cart_detail: null,
};

// First, create the thunk
const createEmptyCart = createAsyncThunk(
  `${KEY_CONSTANT}/createEmptyCart`,
  async () => {
    const client = useApolloClient();

    const response = await client.mutate({
      mutation: mutation.CREATE_EMPTY_CART,
    });
    return response;
  },
);

const cartDetail = createAsyncThunk(
  `${KEY_CONSTANT}/cartDetail`,
  async (cartId) => {
    const client = useApolloClient();

    const response = await client.query({
      query: query.CART_DETAIL,
      variables: { cartId },
    });
    return response;
  },
);

const cartSlice = createSlice({
  name: KEY_CONSTANT,
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [createEmptyCart.pending]: (state, action) => {
      Logger.info(action, 'createEmptyCart pending');
    },

    [createEmptyCart.fulfilled]: (state, action) => {
      const { data } = action.payload;
      const { createEmptyCart } = data;
      if (createEmptyCart) state.cart_id = createEmptyCart;

      Logger.info(action, 'createEmptyCart fulfilled');
    },

    [createEmptyCart.rejected]: (state, action) => {
      Logger.info(action, 'createEmptyCart rejected');
    },

    //Cart Detail
    [cartDetail.pending]: (state, action) => {
      Logger.info(action, 'cartDetail pending');
    },

    [cartDetail.fulfilled]: (state, action) => {
      const { data, loading, error } = action.payload;
      const { cart } = data;
      if (cart) state.cart_detail = cart;

      Logger.info(action, 'cartDetail fulfilled');
    },

    [cartDetail.rejected]: (state, action) => {
      Logger.info(action, 'cartDetail rejected');
    },
  },
});

const { actions, reducer } = cartSlice;
module.exports = {
  reducer,
  actions: { createEmptyCart, cartDetail, ...actions },
};
