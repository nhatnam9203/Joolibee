import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false,
    loading_app: true,
    comingSoonShow: false,
    loadIntro: true,
    isShowOrderList: false,
    fcmToken: '456',
  },
  reducers: {
    showLoading(state, action) {
      state.loading = true;
    },
    hideLoading(state, action) {
      state.loading = false;
    },
    showComingSoon(state, action) {
      state.comingSoonShow = true;
    },
    dismissComingSoon(state, action) {
      state.comingSoonShow = false;
    },
    loadingSuccess(state, action) {
      state.loading_app = false;
    },
    hadLoadIntro(state, action) {
      state.loadIntro = false;
    },
    showOrderList(state, action) {
      state.isShowOrderList = true;
    },
    dismissOrderList(state, action) {
      state.isShowOrderList = false;
    },
    updateFcmToken(state, action) {
      state.fcmToken = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;

module.exports = {
  reducer,
  actions: { ...actions },
};
