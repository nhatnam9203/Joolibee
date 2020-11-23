import { mutation } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, save, StorageKey } from '@storage';
import { generate } from '@utils';
import { useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-community/async-storage';

const KEY_CONSTANT = 'account';

const initialState = {
  user: {
    isRemember: false,
    isLogin: false,
    tempCheckSignup: false,
  },
  isShowQRCode: false,
  isLogout: false,
};

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
    clearSignupState() {},
    clearSignInState() {},

    showQRCode(state) {
      state.isShowQRCode = true;
    },

    dismissQRCode(state) {
      state.isShowQRCode = false;
    },

    saveUserInfo(state, action) {
      const { customer } = action.payload;
      state.user = { ...state.user, profile: customer };
    },

    signInSucceed(state, action) {
      const {
        generateCustomerToken: { token },
      } = action.payload;
      if (token) {
        // received token from server

        // get token object save in store
        let uStorage = get(StorageKey.User);
        // store token to local store
        save(
          StorageKey.User,
          Object.assign({}, uStorage, {
            token,
            modifyAt: generate.timeInMilliseconds(),
          }),
        );
        // update state
        state.user.isLogin = true;
        state.isLogout = false;
      } else {
        state.user.isLogin = true;
      }
    },

    signInError(state, action) {
      state.user.isLogin = false;
    },

    signUpSucceeded(state, action) {
      const { registerCustomer } = action.payload;
      if (registerCustomer?.customer) {
        state.user.tempCheckSignup = true;
      } else {
        state.user.tempCheckSignup = false;
      }
    },

    signUpError(state, action) {
      state.user.tempCheckSignup = false;
    },

    signOutRequest(state, action) {
      state.isLogout = true;
    },
    signOutComplete(state, action) {
      state.isLogout = false;
      state.user = initialState.user;
    },
  },
  extraReducers: {
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
  actions: { feedBack, ...actions },
};
