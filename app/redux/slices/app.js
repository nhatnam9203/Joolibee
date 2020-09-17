import { createSlice } from '@reduxjs/toolkit';
const appSlice = createSlice({
    name: 'app',
    initialState: { loading_app: true },
    reducers: {
        loadingSuccess(state, action) {
            state.loading_app = false;
        }
    }
})
const { actions, reducer } = appSlice;
export const { loadingSuccess } = actions;
export default reducer