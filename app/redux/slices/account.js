import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { mutations, graphQlClient } from '@graphql';

const KEY_CONSTANT = 'account';

// First, create the thunk
const signUp = createAsyncThunk(`${KEY_CONSTANT}/signUp`, async (input) => {
  const data = await graphQlClient.mutate({
    mutation: mutations.SIGNUP,
    variables: input,
  });

  return data;
});

const accountSlice = createSlice({
  name: KEY_CONSTANT,
  initialState: { isLogin: false, username: null, password: null },
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
  },
  extraReducers: {
    [signUp.pending]: (state, action) => {
      state.myAsyncResponse = action.payload;
    },
    [signUp.fulfilled]: (state, action) => {
      state.myAsyncResponse = action.payload;
    },
    [signUp.rejected]: (state, action) => {
      state.myAsyncResponseError = action.payload;
    },
  },
});

const { actions, reducer } = accountSlice;
export const { login, loginSuccess, loginFail, logout } = actions;
export default reducer;
