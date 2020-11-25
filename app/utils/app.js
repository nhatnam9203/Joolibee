import _ from 'lodash';

// const districtsGroups = Object.values(citiesGroups).map((list) =>
//   _.groupBy(list, 'region'),
// );

export const getCitiesList = (store) => {
  if (!store) return [];
  const groupObj = _.groupBy(store, 'city');
  const cities = Object.keys(groupObj).map((x, index) => ({
    label: x,
    value: index,
  }));

  return cities;
};

export const getDistrictInStoreAtIndex = (store, index) => {
  if (!store || index < 0) return [];
  const groupObj = _.groupBy(store, 'city');

  const cityObj = Object.values(groupObj)[index];
  const districtObj = _.groupBy(cityObj, 'region');
  const districts =
    Object.keys(districtObj).map((x, idx) => ({
      label: x,
      value: idx,
      city: index,
    })) || [];
  return districts;
};
