import { showLoading, hideLoading } from './app';
import { setI18nConfig } from '@localize';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const KEY_CONSTANT = 'setting';

export const changeLanguage = createAsyncThunk(
  `${KEY_CONSTANT}/language`,
  async (input, { dispatch }) => {
    return input;
  },
);

const appSlice = createSlice({
  name: 'setting',
  initialState: { language: 'vi' },
  reducers: {},
  extraReducers: {
    [changeLanguage.fulfilled]: (state, action) => {
      Logger.info(action, 'changeLanguage fulfilled');
      state.language = action.payload;
    },
  },
});

const { actions, reducer } = appSlice;
export const {} = actions;
export default reducer;
