import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { showLoading, hideLoading } from './app';
import { stores, cities, districts } from '../../mocks';
import { reverseGeocoding } from '@location';
import { format } from '@utils';
const initStores = Object.values(stores);

export const getPosition = createAsyncThunk(
  `store/reverseGeocoding`,
  async (latlng, { dispatch }) => {
    // await dispatch(showLoading());
    const response = await reverseGeocoding(latlng);
    // await dispatch(hideLoading());

    return response;
  },
);

const storeSlice = createSlice({
  name: 'store',
  initialState: {
    stores: initStores,
    cities,
    districts: [],
    init_location: {},
  },
  reducers: {
    updateStore(state, action) {
      state.stores = Object.values(action.payload);
    },
    filterStore(state, action) {
      const { payload } = action;
      let query = (item) => {
        const { city, region } = item;
        let _city = city.toLowerCase();
        let _region = region.toLowerCase();
        if (payload.city && !payload.district)
          return _city.includes(payload.city?.toLowerCase());
        if (payload.city && payload.district)
          return (
            _city.includes(payload.city?.toLowerCase()) &&
            _region.includes(payload.district?.toLowerCase())
          );
        if (!payload.city && !payload.district) return item;
      };
      state.stores = initStores.filter((item) => query(item));
    },

    filterDistrictByCity(state, action) {
      const { payload } = action;
      state.districts = districts.filter((item) => item.key == payload.key);
    },

    setInitLocation(state, action) {
      state.init_location = action.payload;
    },
  },
  extraReducers: {
    [getPosition.pending]: (state, action) => {
      // Logger.info(action, 'getPosition pending');
    },
    [getPosition.fulfilled]: (state, action) => {
      // Logger.info(action.payload, 'getPosition fulfilled');
      const { payload } = action;
      if (payload) {
        const location = payload[0];

        let city = format.convertString(location?.adminArea);
        let district = format.convertString(location?.subAdminArea);

        let default_district = -1;
        let default_city = cities.findIndex((item) => {
          let label = format.convertString(item.label);
          if (city.includes(label)) return city.includes(label);
        });

        if (default_city > -1) {
          state.districts = districts.filter(
            (item) => item.key == cities[default_city].label,
          );
          default_district = state.districts.findIndex((item) => {
            let label = format.convertString(item.label);
            if (district.includes(label)) return district.includes(label);
          });
        }

        state.init_location = {
          district: location.subAdminArea,
          city: location.adminArea,
          default_city: default_city,
          default_district: default_district,
          ...location.position,
        };
      } else {
      }
    },
    [getPosition.rejected]: (state, action) => {
      // Logger.info(action, 'getPosition rejected');
    },
  },
});

const { actions, reducer } = storeSlice;
module.exports = {
  reducer,
  actions: { getPosition, ...actions },
};
