import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: { loading: false },
  reducers: {
    showLoading(state, action) {
      state.loading = true;
    },
    hideLoading(state, action) {
      state.loading = false;
    },
  },
});

const { actions, reducer } = appSlice;
export const { showLoading, hideLoading } = actions;
export default reducer;
