import { showLoading, hideLoading } from './app';
import { setI18nConfig } from '@localize';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RESULTS } from 'react-native-permissions';

const KEY_CONSTANT = 'setting';
const changeLanguage = createAsyncThunk(
  `${KEY_CONSTANT}/language`,
  async (input, { dispatch }) => {
    return input;
  },
);

const appSlice = createSlice({
  name: 'setting',
  initialState: {
    language: 'vi',
    isAllowLocations: RESULTS.UNAVAILABLE,
    isAllowPushNotify: RESULTS.UNAVAILABLE,
  },
  reducers: {
    allowLocations: (state, action) => {
      state.isAllowLocations = action.payload;
    },
    allowPushNotify: (state, action) => {
      state.isAllowPushNotify = action.payload;
    },
  },
  extraReducers: {
    [changeLanguage.fulfilled]: (state, action) => {
      Logger.info(action, 'changeLanguage fulfilled');
      state.language = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;
module.exports = {
  reducer,
  actions: { changeLanguage, ...actions },
};
