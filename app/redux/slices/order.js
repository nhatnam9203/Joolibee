import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: { isShowOrderList: false },
  reducers: {
    showOrderList(state, action) {
      state.isShowOrderList = true;
    },
    dismissOrderList(state, action) {
      state.isShowOrderList = false;
    },
  },
});

// const { actions, reducer } = orderSlice;
// export const { showOrderList, dismissOrderList } = actions;
export default orderSlice;
