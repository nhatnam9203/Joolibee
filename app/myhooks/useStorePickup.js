import { get, StorageKey } from '@storage';
import React from 'react';
import RNFetchBlob from 'rn-fetch-blob';
import { stores } from '../mocks';
import { useSelector } from 'react-redux';
import { format, appUtil } from '@utils';
import { store } from '@slices';
import { useDispatch } from 'react-redux';

export const useStorePickup = () => {
  const dispatch = useDispatch();
  const [storeList, setStoreList] = React.useState(null);
  const pickupLocation = useSelector((state) => state.store.pickupLocation);
  const currentLocation = useSelector((state) => state.app.currentLocation);

  React.useEffect(() => {
    const loadStoreData = async () => {
      const { path } = await get(StorageKey.StoreVersion);

      await RNFetchBlob.fs
        .readFile(path, 'utf8')
        .then((result) => {
          if (result) {
            setStoreList(Object.values(JSON.parse(result)));
          }
        })
        .catch((e) => {
          setStoreList(Object.values(stores));
        });
    };

    loadStoreData();
  }, []);

  React.useEffect(() => {
    if (storeList && currentLocation) {
      let location;
      // chua tim dc pickup location thi se tim
      if (currentLocation) {
        let city = format.convertString(currentLocation?.adminArea);
        let district = format.convertString(currentLocation?.subAdminArea);

        const cities = appUtil.getCitiesList(storeList);
        dispatch(store.updateCities(cities));
        const currentCity = cities.find((item) => {
          let label = format.convertString(item.label);
          if (city.includes(label)) return city.includes(label);
        });

        if (currentCity) {
          location = { cityId: currentCity.id };
          const districtsInCity = appUtil.getDistrictInCity(
            storeList,
            currentCity.id,
          );

          const currentDistrict = districtsInCity.find((item) => {
            let label = format.convertString(item.label);
            if (district.includes(label)) return district.includes(label);
          });

          if (currentDistrict) {
            location = Object.assign({}, location, {
              districtId: currentDistrict.id,
            });
          }

          dispatch(store.pickupLocation(location));
        }
      }
    }
  }, [storeList, currentLocation, dispatch]);

  return storeList;
};
