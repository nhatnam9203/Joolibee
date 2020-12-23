import { createSlice } from '@reduxjs/toolkit';

const KEY_CONSTANT = 'cart';

const initialState = {
  cart_detail: null,
  customerCart: null,
};

const cartSlice = createSlice({
  name: KEY_CONSTANT,
  initialState: initialState,
  reducers: {
    updateCustomerCart: (state, action) => {
      state.customerCart = action.payload;
    },
    updateShippingAddress: (state, action) => {
      state.customerCart = Object.assign({}, state.customerCart, {
        shipping_addresses: action.payload,
      });
    },
  },
  extraReducers: {},
});

const { actions, reducer } = cartSlice;
module.exports = {
  reducer,
  actions: { ...actions },
};
