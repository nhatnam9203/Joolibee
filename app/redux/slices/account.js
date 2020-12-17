// import { mutation } from '@graphql';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { get, save, StorageKey } from '@storage';
import { generate } from '@utils';
// import { useApolloClient } from '@apollo/client';

const KEY_CONSTANT = 'account';

const initialState = {
  user: {
    isRemember: false,
    isLogin: false,
    tempCheckSignup: false,
    phone_number: null,
  },
  cart: {},
  isShowQRCode: false,
  isEatingUtensils: false,
  count_input_coupon: 5,
  timming: false,
  addresses: [],
  notificationList: [],
};

const feedBack = createAsyncThunk(
  `${KEY_CONSTANT}/feedBack`,
  async (input, {}) => {
    // const client = useApolloClient();

    // const response = await client.mutate({
    //   mutation: mutation.FEED_BACK,
    //   variables: input,
    // });
    return {};
    // return response ;
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

    updateCustomerAddress(state, action) {
      const { customer } = action.payload;
      state.user = { ...state.user, profile: customer };
    },

    setEatingUtensils(state) {
      state.isEatingUtensils = !state.isEatingUtensils;
    },

    setCountInputCoupon(state, action) {
      state.count_input_coupon = action.payload;
    },

    toggleTimmer(state) {
      state.timming = !state.timming;
    },

    signInSucceed(state, action) {
      const { token, phone_number } = action.payload;
      console.log('action.payload', action.payload);
      if (token) {
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
        state.user.phone_number = phone_number;
      } else {
        state.user.isLogin = false;
        state.user.phone_number = null;
      }
    },

    signInError(state, action) {
      state.user = initialState.user;
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

    // clear redux state for all info account/ reset account state
    signOutComplete(state) {
      return initialState;
    },

    resetCustomerCart(state, action) {
      state.cart = action.payload;
      state.isEatingUtensils = false;
      state.count_input_coupon = 5;
      state.timming = false;
    },

    setCustomerCart: (state, action) => {
      state.cart = action.payload;
    },

    updateCustomerCart: (state, action) => {
      state.cart = Object.assign({}, state.cart, action.payload);
    },

    addCustomerCartQuantity: (state, action) => {
      state.cart = Object.assign({}, state.cart, {
        total_quantity: state.cart.total_quantity + action.payload,
      });
    },

    saveAddressCustomer(state, action) {
      state.addresses = action.payload;
    },

    setNotificationList: (state, action) => {
      state.notificationList = action.payload;
    },

    updateNotify: (state, action) => {
      const { id } = action.payload || {};
      const notifyIndex = state.notificationList?.findIndex((x) => x.id === id);
      if (notifyIndex >= 0) {
        let notify = state.notificationList[notifyIndex];
        notify.is_read = true;
        // state.notificationList = [
        //   ...state.notificationList,
        //   Object.assign({}, notify, { is_read: true }),
        // ];
      }
    },
    verifiedSucceed(state, action) {
      const { token } = action.payload;
      if (token) {
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
      }
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
