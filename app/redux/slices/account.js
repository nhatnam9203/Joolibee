import { graphQlClient, mutation } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, save, StorageKey } from '@storage';
import { generate } from '@utils';

const KEY_CONSTANT = 'account';

const initialState = {
  user: {
    isRemember: false,
    tokenKey: null,
  },
  isShowQRCode: false,
  signInLoading: false,
  signUpLoading: false,
  signUpSucceeded: false,
};

// First, create the thunk
const signUp = createAsyncThunk(
  `${KEY_CONSTANT}/signUp`,
  async (input, { dispatch }) => {
    const response = await graphQlClient.mutate({
      mutation: mutation.SIGN_UP,
      variables: input,
    });

    return response;
  },
);

const signIn = createAsyncThunk(
  `${KEY_CONSTANT}/signIn`,
  async (input, { dispatch }) => {
    const response = await graphQlClient.mutate({
      mutation: mutation.SIGN_IN,
      variables: input,
    });

    return response;
  },
);

const accountSlice = createSlice({
  name: KEY_CONSTANT,
  initialState: initialState,
  reducers: {
    signOutRequest: (state, action) => {
      state.user = initialState.user;
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
      state.signUpLoading = true;
    },
    [signUp.fulfilled]: (state, action) => {
      Logger.info(action, 'signUp fulfilled');
      state.signUpLoading = false;
      const { error, data } = action.payload;
      if (data?.registerCustomer?.customer) {
        state.signUpSucceeded = true;
      } else {
        state.signUpSucceeded = false;
      }
    },
    [signUp.rejected]: (state, action) => {
      Logger.info(action, 'signUp rejected');
      state.signUpLoading = true;
    },

    // Sign In
    [signIn.pending]: (state, action) => {
      Logger.info(action, 'signIn pending');
      state.signInLoading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      Logger.info(action, 'signIn fulfilled');
      const { data } = action.payload;
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
        storeTokenObj[StorageKey.Token] = str;
        save(storeTokenObj, StorageKey.Token);

        // update state
        state.user.tokenKey = str;
        Logger.info(state, 'tokenKey');
      } else {
        state.tokenKey = null;
      }
    },
    [signIn.rejected]: (state, action) => {
      Logger.info(action, 'signIn rejected');
      state.signInLoading = false;
      state.user.tokenKey = null;
    },
  },
});

const { actions, reducer } = accountSlice;
module.exports = {
  reducer,
  actions: { signIn, signUp, ...actions },
};
