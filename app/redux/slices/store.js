import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { reverseGeocoding } from '@location';
import { format, appUtil } from '@utils';
import _ from 'lodash';

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
    default: {
      stores: [], // ! Nạp từ json file ko nên đổi
      cities: [],
      districts: [],
    },
    filterStores: [],
    init_location: {},
    my_location: {
      cityId: 0,
      districtId: 0,
    },
  },
  reducers: {
    updateStore(state, action) {
      state.stores = Object.values(action.payload);
    },

    pickMyLocations(state, action) {
      state.my_location = action.payload;
    },

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

    setInitLocation(state, action) {
      state.init_location = action.payload;
    },

    updateCities: (state, action) => {
      state.cities = action.payload;
    },

    updateDistricts: (state, action) => {
      state.districts = action.payload;
    },

    setStorePickup: (state, action) => {
      state.default = action.payload;
    },
  },
  extraReducers: {
    [getPosition.fulfilled]: (state, action) => {
      const { payload } = action;
      if (payload) {
        const location = payload[0];

        let city = format.convertString(location?.adminArea);
        let district = format.convertString(location?.subAdminArea);

        const { cities, districts } = state.default;

        const findCity = cities.find((item) => {
          let label = format.convertString(item.label);
          if (city.includes(label)) return city.includes(label);
        });

        const findDistrict = districts.find((item) => {
          let label = format.convertString(item.label);

          if (district.includes(label)) return district.includes(label);
        });
        // !! check lai truong hop findDistrict undefine
        state.my_location = Object.assign({}, state.my_location, {
          cityId: findCity?.id,
          districtId: findDistrict?.id,
          ...location,
        });
      }
    },
  },
});

const { actions, reducer } = storeSlice;
module.exports = {
  reducer,
  actions: { getPosition, ...actions },
};
