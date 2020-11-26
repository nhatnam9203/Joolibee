import _ from 'lodash';

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
  const groupObj = _.groupBy(store, 'region.id');
  const cities = Object.keys(groupObj).map((regionId) => {
    const first = _.head(groupObj[regionId]);
    return {
      value: regionId,
      label: first?.region?.name,
      id: first?.region?.id,
      city: first?.city?.id,
    };
  });

  return cities;
};

export const getDistrictInCity = (store, cityId) => {
  if (!store || cityId < 0) return [];

  const groupObj = _.groupBy(store, 'city.id');

  const listRegions = groupObj[cityId + ''];

  const groupRegions = _.groupBy(listRegions, 'region.id');

  const districts = Object.keys(groupRegions).map((x) => {
    const first = _.head(groupRegions[x]);

    return {
      value: x,
      label: first?.region?.name,
      city: first?.city?.name,
      id: first?.region?.id,
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
      return store.city.id === cityId && store.region.id === districtId;
    });
  }
  return stores.filter((store) => store.city.id === cityId);
};
