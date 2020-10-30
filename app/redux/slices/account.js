import { mutation } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, save, StorageKey } from '@storage';
import { generate } from '@utils';
import { useApolloClient } from '@apollo/client';

const KEY_CONSTANT = 'account';

const initialState = {
  user: {
    isRemember: false,
    tokenKey: null,
    tempCheckSignup: false,
  },
  isShowQRCode: false,
};

// First, create the thunk
const signUp = createAsyncThunk(`${KEY_CONSTANT}/signUp`, async (input, {}) => {
  const client = useApolloClient();

  const response = await client.mutate({
    mutation: mutation.SIGN_UP,
    variables: input,
  });
  return response;
});

// const signIn = createAsyncThunk(`${KEY_CONSTANT}/signIn`, async (input, {}) => {
//   const client = useApolloClient();

//   const response = await client.mutate({
//     mutation: mutation.SIGN_IN,
//     variables: input,
//   });
//   return response;
// });

const feedBack = createAsyncThunk(
  `${KEY_CONSTANT}/feedBack`,
  async (input, {}) => {
    const client = useApolloClient();

    const response = await client.mutate({
      mutation: mutation.FEED_BACK,
      variables: input,
    });
    return response;
  },
);

const accountSlice = createSlice({
  name: KEY_CONSTANT,
  initialState: initialState,
  reducers: {
    signOutRequest: (state) => {
      state.user = initialState.user;
    },
    clearSignupState() {},
    clearSignInState() {},

    showQRCode(state) {
      state.isShowQRCode = true;
    },

    dismissQRCode(state) {
      state.isShowQRCode = false;
    },

    signInSucceed(state, action) {
      const {
        generateCustomerToken: { token },
      } = action.payload;
      if (token) {
        // received token from server

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
      } else {
        state.user.tokenKey = null;
      }
    },
    signInError(state, action) {
      state.user.tokenKey = null;
    },
  },
  extraReducers: {
    // Sign Up
    [signUp.pending]: (state, action) => {
      Logger.info(action, 'signUp pending');

      state.user.tempCheckSignup = false;
    },
    [signUp.fulfilled]: (state, action) => {
      Logger.info(action, 'signUp fulfilled');

      const { data } = action.payload;
      if (data?.registerCustomer?.customer) {
        state.user.tempCheckSignup = true;
      } else {
        state.user.tempCheckSignup = false;
      }
    },
    [signUp.rejected]: (state, action) => {
      Logger.info(action, 'signUp rejected');
      state.user.tempCheckSignup = false;
    },

    //FeedBack
    [feedBack.pending]: (state, action) => {
      Logger.info(action, 'feedBack pending');
    },

    [feedBack.fulfilled]: (state, action) => {
      Logger.info(action, 'feedBack fulfilled');
    },

    [feedBack.rejected]: (state, action) => {
      Logger.info(action, 'feedBack rejected');
    },
  },
});

const { actions, reducer } = accountSlice;
module.exports = {
  reducer,
  actions: { signUp, feedBack, ...actions },
};
