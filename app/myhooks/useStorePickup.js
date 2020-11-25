import { stores } from '../mocks';
import { appUtil } from '@utils';
import _ from 'lodash';

export const useStorePickup = () => {
  const initStores = Object.values(stores);
  const cities = appUtil.getCitiesList(initStores);
  const districts = appUtil.getDistrictList(initStores);

  //   React.useEffect(() => {}, []);

  return [cities, districts, initStores];
};
