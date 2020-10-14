import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient } from '@graphql';
import { showLoading, hideLoading } from './app';

const KEY_CONSTANT = 'account';

// First, create the thunk
export const signUp = createAsyncThunk(
  `${KEY_CONSTANT}/signUp`,
  async (input, { dispatch }) => {
    await dispatch(showLoading());
    const response = await graphQlClient.mutate({
      mutation: mutation.SIGN_UP,
      variables: input,
    });
    await dispatch(hideLoading());

    return response;
  },
);

export const signIn = createAsyncThunk(
  `${KEY_CONSTANT}/signIn`,
  async (input, { dispatch }) => {
    Logger.log(input, 'signIn');
    dispatch(showLoading());
    const response = await graphQlClient.mutate({
      mutation: mutation.SIGN_IN,
      variables: input,
    });
    dispatch(hideLoading());

    return response;
  },
);

const accountSlice = createSlice({
  name: KEY_CONSTANT,
  initialState: {
    isLogin: false,
    username: null,
    password: null,
    signUpError: null,
    signUpSuccess: false,
    signInError: null,
    isShowQRCode: false,
  },
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
    clearSignupState(state, action) {
      state.signUpError = null;
      state.signUpSuccess = false;
    },
    clearSignInState(state, action) {
      state.signInError = null;
    },

    showQRCode(state, action) {
      state.isShowQRCode = true;
    },

    dismissQRCode(state, action) {
      state.isShowQRCode = false;
    },
  },
  extraReducers: {
    // Sign Up
    [signUp.pending]: (state, action) => {
      Logger.info(action, 'signUp pending');
      state.signUpError = null;
      state.signUpSuccess = false;
    },
    [signUp.fulfilled]: (state, action) => {
      Logger.info(action, 'signUp fulfilled');
      const { error, data } = action.payload;
      if (data?.registerCustomer?.customer) {
        state.signUpSuccess = true;
        state.signUpError = null;
      } else {
        state.signUpSuccess = false;
        state.signUpError = error;
      }
    },
    [signUp.rejected]: (state, action) => {
      Logger.info(action, 'signUp rejected');
    },

    // Sign In
    [signIn.pending]: (state, action) => {
      Logger.info(action, 'signIn pending');
      state.signInError = null;
    },
    [signIn.fulfilled]: (state, action) => {
      Logger.info(action, 'signIn fulfilled');
      const { error, data } = action.payload;
      if (data?.generateCustomerToken?.token) {
        state.signInError = null;
      } else {
        state.signInError = error;
      }
      state.isLogin = true;
    },
    [signIn.rejected]: (state, action) => {
      Logger.info(action, 'signIn rejected');
      state.isLogin = true;
    },
  },
});

const { actions, reducer } = accountSlice;
export const {
  login,
  loginSuccess,
  loginFail,
  logout,
  clearSignupState,
  clearSignInState,
  showQRCode,
  dismissQRCode,
} = actions;
export default reducer;
