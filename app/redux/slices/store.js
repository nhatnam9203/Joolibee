import { createSlice } from "@reduxjs/toolkit"
import { stores } from "../../mocks";
const storeSlice = createSlice({
    name: 'store',
    initialState: {
        stores: Object.values(stores)
    },
    reducers: {
        updateStore(state, action) {
            state.stores = Object.values(action.payload)
        },
    }
})

const { actions, reducer } = storeSlice;
export const {
    updateStore
} = actions;
export default reducer;