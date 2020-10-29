import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient } from '@graphql';
import { showLoading, hideLoading } from './app';
import { useApolloClient } from '@apollo/client';

const KEY_CONSTANT = 'account';

// First, create the thunk
export const signUp = createAsyncThunk(
  `${KEY_CONSTANT}/signUp`,
  async (input, { dispatch }) => {
    const client = useApolloClient();

    dispatch(showLoading());
    const response = await client.mutate({
      mutation: mutation.SIGN_UP,
      variables: input,
    });
    dispatch(hideLoading());

    return response;
  },
);

export const signIn = createAsyncThunk(
  `${KEY_CONSTANT}/signIn`,
  async (input, { dispatch }) => {
    Logger.log(input, 'signIn');
    const client = useApolloClient();

    dispatch(showLoading());
    const response = await client.mutate({
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
    isLogin: true,
    username: null,
    password: null,
    signUpError: null,
    signUpSuccess: false,
    signInError: null,
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
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      Logger.info(action, 'signUp pending');
      state.signUpError = null;
      state.signUpSuccess = false;
    },
    [signUp.fulfilled]: (state, action) => {
      Logger.info(action, 'signUp fulfilled');
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
    },
    // [signIn.rejected]: (state, action) => {
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
  clearSignInState,
} = actions;
export default reducer;
