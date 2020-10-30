import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const KEY_CONSTANT = 'address';

const addressSlice = createSlice({
  name: KEY_CONSTANT,
  initialState: {
    locations: [],
    loading_location: false
  },
  reducers: {
    autoCompleteStart(state) {
      state.loading_location = true;
    },
    autoCompleteSuccess(state, action) {

      state.locations = action.payload;
      state.loading_location = false;
    },
    autoCompleteFail(state) {
      state.loading_location = false;
    },

  },
});

const { actions, reducer } = addressSlice;
module.exports = {
  reducer,
  actions,
};
