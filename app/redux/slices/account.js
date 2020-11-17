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
    tokenKey: null,
    tempCheckSignup: false,
  },
  isShowQRCode: false,
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

const signOutRequest = createAsyncThunk(
  `${KEY_CONSTANT}/signOutRequest`,
  async (input, {}) => {
    try {
      // const client = useApolloClient();
      // client.resetStore();
      await AsyncStorage.clear();
    } catch (e) {
      throw e;
    }
    return initialState.user;
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

    [signOutRequest.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { actions, reducer } = accountSlice;
module.exports = {
  reducer,
  actions: { feedBack, signOutRequest, ...actions },
};
