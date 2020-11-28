import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: { pickup_location_code: null },
  reducers: {
    pickupStore: (state, action) => {
      state.pickup_location_code = action.payload;
    },
  },
});

const { actions, reducer } = orderSlice;
module.exports = {
  reducer,
  actions: { ...actions },
};
