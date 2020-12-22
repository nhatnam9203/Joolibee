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

export const getNearStore = (distances) => {
  // dua vao danh sach de get store gan nhat
  /**
   * results example
   * {"destination_addresses":["104 Đặng Văn Bi, Bình Thọ, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam","19 Tô Ký, Tân Chánh Hiệp, Quận 12, Thành phố Hồ Chí Minh, Vietnam","821 HL2, Bình Trị Đông A, Bình Tân, Thành phố Hồ Chí Minh, Vietnam","102 Phan Văn Hớn, Tân Thới Nhất, Quận 12, Thành phố Hồ Chí Minh, Vietnam","242 Đ. Phạm Văn Đồng, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam","1239 TL8, Trung An, Củ Chi, Thành phố Hồ Chí Minh, Vietnam","163 Sư Vạn Hạnh, Phường 12, Quận 10, Thành phố Hồ Chí Minh 700000, Vietnam","650a Âu Cơ, Phường 10, Tân Bình, Thành phố Hồ Chí Minh, Vietnam","50 Lê Văn Việt, Hiệp Phú, Quận 9, Thành phố Hồ Chí Minh, Vietnam","Kios 28, Siêu Thị Big C An Lạc, 1231, Khu Phố 5, Quốc Lộ 1, Phường Bình Trị Đông B, Quận Bình Tân, Bình Trị Đông B, Bình Tân, Thành phố Hồ Chí Minh, Vietnam","A12 Đ. Phan Văn Trị, Phường 7, Gò Vấp, Thành phố Hồ Chí Minh, Vietnam","304A Quang Trung, Phường 11, Gò Vấp, Thành phố Hồ Chí Minh, Vietnam","358 Trường Chinh, Phường 13, Tân Bình, Thành phố Hồ Chí Minh, Vietnam","204 Nguyễn Thị Minh Khai, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Vietnam","14/25 QL13, Hiệp Bình Chánh, Thủ Đức, Thành phố Hồ Chí Minh, Vietnam","497 Hoà Hảo, Phường 4, Quận 10, Thành phố Hồ Chí Minh, Vietnam","9 Nguyễn Thái Bình, Phường 4, Tân Bình, Thành phố Hồ Chí Minh, Vietnam","21 Hoa Sứ, Phường 7, Phú Nhuận, Thành phố Hồ Chí Minh, Vietnam","354 Đ. Trần Hưng Đạo, Phường 2, Quận 5, Thành phố Hồ Chí Minh, Vietnam","194c Pasteur, Phường 6, Quận 3, Thành phố Hồ Chí Minh, Vietnam","191 Quang Trung, Hiệp Phú, Quận 9, Thành phố Hồ Chí Minh, Vietnam"],"origin_addresses":["117 Bình Long, Bình Hưng Hoà A, Bình Tân, Thành phố Hồ Chí Minh, Vietnam"],"rows":[{"elements":[{"distance":{"text":"21.3 km","value":21299},"duration":{"text":"48 mins","value":2890},"status":"OK"},{"distance":{"text":"10.8 km","value":10818},"duration":{"text":"27 mins","value":1613},"status":"OK"},{"distance":{"text":"4.3 km","value":4325},"duration":{"text":"12 mins","value":724},"status":"OK"},{"distance":{"text":"7.8 km","value":7793},"duration":{"text":"20 mins","value":1221},"status":"OK"},{"distance":{"text":"15.4 km","value":15364},"duration":{"text":"36 mins","value":2155},"status":"OK"},{"distance":{"text":"30.0 km","value":29973},"duration":{"text":"57 mins","value":3441},"status":"OK"},{"distance":{"text":"7.2 km","value":7163},"duration":{"text":"23 mins","value":1373},"status":"OK"},{"distance":{"text":"2.9 km","value":2860},"duration":{"text":"9 mins","value":537},"status":"OK"},{"distance":{"text":"23.5 km","value":23537},"duration":{"text":"52 mins","value":3143},"status":"OK"},{"distance":{"text":"7.4 km","value":7421},"duration":{"text":"20 mins","value":1225},"status":"OK"},{"distance":{"text":"12.6 km","value":12617},"duration":{"text":"33 mins","value":1999},"status":"OK"},{"distance":{"text":"10.1 km","value":10063},"duration":{"text":"26 mins","value":1568},"status":"OK"},{"distance":{"text":"4.4 km","value":4357},"duration":{"text":"13 mins","value":788},"status":"OK"},{"distance":{"text":"9.5 km","value":9514},"duration":{"text":"29 mins","value":1730},"status":"OK"},{"distance":{"text":"15.5 km","value":15520},"duration":{"text":"37 mins","value":2247},"status":"OK"},{"distance":{"text":"8.1 km","value":8105},"duration":{"text":"24 mins","value":1433},"status":"OK"},{"distance":{"text":"6.5 km","value":6513},"duration":{"text":"18 mins","value":1109},"status":"OK"},{"distance":{"text":"10.1 km","value":10111},"duration":{"text":"30 mins","value":1774},"status":"OK"},{"distance":{"text":"9.0 km","value":8963},"duration":{"text":"27 mins","value":1597},"status":"OK"},{"distance":{"text":"10.4 km","value":10403},"duration":{"text":"32 mins","value":1908},"status":"OK"},{"distance":{"text":"23.0 km","value":23003},"duration":{"text":"51 mins","value":3053},"status":"OK"}]}],"status":"OK"}
   */
  if (distances.length > 0) {
    const minIndex = distances.indexOf(Math.min(...distances));

    return minIndex;
  }
  return null;
};
