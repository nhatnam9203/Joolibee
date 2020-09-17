import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: { loading: false, loading_app: true },
  reducers: {
    showLoading(state, action) {
      state.loading = true;
    },
    hideLoading(state, action) {
      state.loading = false;
    },
    loadingSuccess(state, action) {
      state.loading_app = false;
    }
  },
});

const { actions, reducer } = appSlice;
export const { showLoading, hideLoading, loadingSuccess } = actions;
export default reducer;
