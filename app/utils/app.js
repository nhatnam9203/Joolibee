import _ from 'lodash';
import RNFetchBlob from 'rn-fetch-blob';

export const getCitiesList = (store) => {
  if (!store) return [];
  const groupObj = _.groupBy(store, 'city.id');
  const cities = Object.keys(groupObj).map((cityId) => {
    const first = _.head(groupObj[cityId]);

    return { value: cityId, label: first?.city?.name, id: first?.city?.id };
  });

  return cities;
};

export const getDistrictList = (store) => {
  if (!store) return [];
  const groupObj = _.groupBy(store, 'district.id');
  const cities = Object.keys(groupObj).map((regionId) => {
    const first = _.head(groupObj[regionId]);
    return {
      value: regionId,
      label: first?.district?.name,
      id: first?.district?.id,
      city: first?.city?.id,
    };
  });

  return cities;
};

export const getDistrictInCity = (store, cityId) => {
  if (!store || cityId < 0) return [];

  const groupObj = _.groupBy(store, 'city.id');

  const listRegions = groupObj[cityId];

  const groupRegions = _.groupBy(listRegions, 'district.id');

  const districts = Object.keys(groupRegions).map((x) => {
    const first = _.head(groupRegions[x]);

    return {
      value: x,
      label: first?.district?.name,
      city: first?.city?.name,
      id: first?.district?.id,
    };
  });

  return districts;
};

export const getStoreListInCity = (stores, cityId, districtId) => {
  if (!stores) {
    return [];
  }

  if (districtId && cityId) {
    return stores.filter((store) => {
      return store.city.id === cityId && store.district.id === districtId;
    });
  }
  return stores.filter((store) => store.city.id === cityId);
};

export const getStorePath = () => {
  const dirs = RNFetchBlob.fs.dirs;
  return `${dirs.DocumentDir}/store.json`;
};

export const getRegion = () => ({
  region: {
    region: 'Viet Nam',
    region_code: 'VN',
  },
});
