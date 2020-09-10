import { createSlice } from '@reduxjs/toolkit';

const accountSlice = createSlice({
  name: 'account',
  initialState: { isLogin: false, username: null, password: null },
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    loginSuccess(state, action) {},
    loginFail(state, action) {},
    logout(state, action) {
      state.isLogin = false;
      state.username = null;
      state.password = null;
    },
  },
});

const { actions, reducer } = accountSlice;
export const { login, loginSuccess, loginFail, logout } = actions;
export default reducer;
