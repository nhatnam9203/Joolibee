import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutation, graphQlClient } from '@graphql';
import { showLoading, hideLoading } from './app';
import { save, get, remove, StorageKey } from '@storage';
import { generate } from '@utils';

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
    dispatch(showLoading());
    const response = await graphQlClient.mutate({
      mutation: mutation.SIGN_IN,
      variables: input,
    });
    dispatch(hideLoading());

    return response;
  },
);

const initialState = {
  isRemember: false,
  tokenKey: null,
  isShowQRCode: false,
  signInLoading: false,
  signUpLoading: false,
};

const accountSlice = createSlice({
  name: KEY_CONSTANT,
  initialState,
  reducers: {
    logout: (state, action) => {
      remove(StorageKey.Token);
      return initialState;
    },
    clearSignupState(state, action) {},
    clearSignInState(state, action) {},

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
      } else {
      }
    },
    [signUp.rejected]: (state, action) => {
      Logger.info(action, 'signUp rejected');
    },

    // Sign In
    [signIn.pending]: (state, action) => {
      Logger.info(action, 'signIn pending');
      state.signInLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      Logger.info(action, 'signIn fulfilled');
      const { error, data } = action.payload;
      state.signInLoading = false;

      const { generateCustomerToken } = data;

      if (generateCustomerToken?.token) {
        // received token from server
        const token = generateCustomerToken?.token;

        // get token object save in store
        const storeTokenObj = get(StorageKey.Token) || {};

        // gen new key at time
        const str = generate.timeInMilliseconds();

        // store token to local store
        storeTokenObj[str] = token;
        save(storeTokenObj, StorageKey.Token);

        // update state
        state.tokenKey = str;
        Logger.info(state, 'tokenKey');
      } else {
        state.tokenKey = null;
      }
    },
    [signIn.rejected]: (state, action) => {
      Logger.info(action, 'signIn rejected');
      state.signInLoading = false;
      state.tokenKey = null;
    },
  },
});

const { actions, reducer } = accountSlice;
export const {
  logout,
  clearSignupState,
  clearSignInState,
  showQRCode,
  dismissQRCode,
} = actions;
export default reducer;
