import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reverseGeocoding } from '@location';
import { format, appUtil } from '@utils';
import _ from 'lodash';

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    filterStores: [],
    pickupLocation: null,
    cities: [],
    pickupStores: null,
  },
  reducers: {
    filterStore(state, action) {
      const { payload } = action;
      let query = (item) => {
        const { city, region } = item;
        let _city = city.toLowerCase();
        let _region = region.toLowerCase();

        if (payload.city && !payload.district) {
          return _city.includes(payload.city?.toLowerCase());
        }

        if (payload.city && payload.district) {
          return (
            _city.includes(payload.city?.toLowerCase()) &&
            _region.includes(payload.district?.toLowerCase())
          );
        }

        if (!payload.city && !payload.district) {
          return item;
        }
      };
      state.filterStores = state.default.stores.filter((item) => query(item));
    },

    updateCities: (state, action) => {
      state.cities = action.payload;
    },

    updateDistricts: (state, action) => {
      state.districts = action.payload;
    },

    pickLocation: (state, action) => {
      Logger.debug(action, '======> action');
      state.pickupLocation = action.payload;
    },

    setPickupStore: (state, action) => {
      state.pickupStores = action.payload;
    },
  },
  extraReducers: {},
});

const { actions, reducer } = storeSlice;
module.exports = {
  reducer,
  actions: { ...actions },
};
