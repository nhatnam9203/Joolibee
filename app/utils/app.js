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

export const getDistrictInCity = (store, cityId) => {
  if (!store || cityId < 0) return [];

  const groupObj = _.groupBy(store, 'city.id');
  const listRegions = groupObj[cityId];
  const groupRegions = _.groupBy(listRegions, 'region.id');

  const districts = Object.keys(groupRegions).map((x) => {
    const first = _.head(groupRegions[x]);

    return {
      value: x,
      label: first?.region?.name,
      city: first?.city?.name,
      id: first?.city?.id,
    };
  });

  return districts;
};
