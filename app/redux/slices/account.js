import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient } from '@graphql';
import { showLoading, hideLoading } from './app';

const KEY_CONSTANT = 'account';

// First, create the thunk
export const signUp = createAsyncThunk(
  `${KEY_CONSTANT}/signUp`,
  async (input, { dispatch }) => {
    dispatch(showLoading());
    const response = await graphQlClient.mutate({
      mutation: mutation.SIGNUP,
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
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      Logger.info(action, 'accountSlice pending');
      state.signUpError = null;
      state.signUpSuccess = false;
    },
    [signUp.fulfilled]: (state, action) => {
      Logger.info(action, 'accountSlice fulfilled');
      const { error, data } = action.payload;
      if (data?.createCustomer?.customer) {
        state.signUpSuccess = true;
        state.signUpError = null;
      } else {
        state.signUpSuccess = false;
        state.signUpError = error;
      }
    },
    // [signUp.rejected]: (state, action) => {
    //   Logger.info(action, 'accountSlice rejected');
    // },
  },
});

const { actions, reducer } = accountSlice;
export const {
  login,
  loginSuccess,
  loginFail,
  logout,
  clearSignupState,
} = actions;
export default reducer;
