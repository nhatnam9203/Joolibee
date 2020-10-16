import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from './app';
import { includes } from "lodash";
import { stores } from "../../mocks";
import { reverseGeocoding } from "@location";
const initStores = Object.values(stores);

export const getPosition = createAsyncThunk(
    `store/reverseGeocoding`,
    async (latlng, { dispatch }) => {
        await dispatch(showLoading());
        const response = await reverseGeocoding(latlng)
        await dispatch(hideLoading());

        return response;
    },
);


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
            const { payload } = action;
            let query = (item) => {
                const { city, region } = item;
                console.log('payload',payload)
                let _city = city.toLowerCase();
                let _region = region.toLowerCase()
                if (payload.city && !payload.district) return _city.includes(payload.city);
                if (payload.city && payload.district) return _city.includes(payload.city) && _region.includes(payload.district);
                if (!payload.city && !payload.district) return item
            }
  
            state.stores = initStores.filter((item) => query(item))
        },
        setInitLocation(state, action) {
            state.init_location = action.payload
        },
    },
    extraReducers: {
        [getPosition.pending]: (state, action) => {
            Logger.info(action, 'getPosition pending');
        },
        [getPosition.fulfilled]: (state, action) => {
            Logger.info(action.payload, 'getPosition fulfilled');
            const { payload } = action;
            if (payload) {
                const location = payload[0];
                state.init_location = {
                    "district": location.subAdminArea,
                    city: location.adminArea,
                    ...location.position
                }
            } else {
            }
        },
        [getPosition.rejected]: (state, action) => {
            Logger.info(action, 'getPosition rejected');
        },


    },
})

const { actions, reducer } = storeSlice;
export const {
    updateStore,
    filterStore,
    setInitLocation
} = actions;
export default reducer;