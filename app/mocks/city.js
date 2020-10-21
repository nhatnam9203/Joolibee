import stores from './store.json';
import _ from 'lodash';
const initStores = Object.values(stores);
const cities = initStores.map((item, index) => {
  return {
    label: item.city,
    value: index,
  };
});

export default _.uniqBy(cities, 'label');
