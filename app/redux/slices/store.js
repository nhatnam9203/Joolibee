import { createSlice } from "@reduxjs/toolkit"
import { includes } from "lodash";
import { stores } from "../../mocks";
const initStores = Object.values(stores);
const storeSlice = createSlice({
    name: 'store',
    initialState: {
        stores: initStores,
        init_location: {}
    },
    reducers: {
        updateStore(state, action) {
            state.stores = Object.values(action.payload)
        },
        filterStore(state, action) {
            let query = (item) => {
                const { city, region } = item;
                const { payload } = action;
                let _city = city.toLowerCase();
                let _region = region.toLowerCase()
                if (payload.city && !payload.district) return _city.includes(payload.city);
                if (payload.city && payload.district) return _city.includes(payload.city) && _region.includes(payload.district);
                if (!payload) return true
            }
            state.stores = initStores.filter((item) => query(item))
        },
        setInitLocation(state, action) {
            state.init_location = action.payload
        }
    }
})

const { actions, reducer } = storeSlice;
export const {
    updateStore,
    filterStore,
    setInitLocation
} = actions;
export default reducer;