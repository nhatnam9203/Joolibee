import { createSlice } from '@reduxjs/toolkit';
import { or } from 'react-native-reanimated';

const orderSlice = createSlice({
  name: 'order',
  initialState: { pickup_location_code: null, orderList: null },
  reducers: {
    pickupStore: (state, action) => {
      state.pickup_location_code = action.payload;
    },
    setOrderItemList: (state, action) => {
      if (action.payload?.length > 0) {
        let data = [...action.payload];
        state.orderList = data?.sort((a, b) => {
          if (+a.order_number < +b.order_number) return 1;
          if (+a.order_number > +b.order_number) return -1;
          return 0;
        });
      } else {
        state.orderList = action.payload;
      }
    },

    updateOrderList: (state, action) => {
      if (action.payload?.length > 0) {
        let data = [...action.payload];
        state.orderList = [
          data?.sort((a, b) => {
            if (+a.order_number < +b.order_number) return 1;
            if (+a.order_number > +b.order_number) return -1;
            return 0;
          }),
          ...state.orderList,
        ];
      }
    },

    updateOrderStatus: (state, action) => {
      const { status, order_number } = action.payload;
      state.orderList = state.orderList.map((x) => {
        if (x.order_number === order_number) {
          return Object.assign({}, x, { status });
        } else {
          return x;
        }
      });
    },
  },
});

const { actions, reducer } = orderSlice;
module.exports = {
  reducer,
  actions: { ...actions },
};
