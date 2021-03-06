import Config from 'react-native-config';
const queryString = require('query-string');

const default_url = `/distancematrix/json?key=${Config.GOOGLE_API_KEY}&`;

export const distanceMatrix = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const stringified = queryString.stringify(params);
      //   const stringified = encodeURI(params);

      const url = Config.MAPS_ENDPOINT + default_url + stringified;
      Logger.debug(url, '======> resJson url');

      const response = await fetch(url);
      const resJson = await response.json();
      Logger.debug(resJson, '======> resJson');
      const data = resJson?.rows
        ?.find(Boolean)
        ?.elements?.map((x) => x.distance?.value);
      Logger.debug(data, '======> data value');

      let newResponse = {
        status: resJson.status,
        data: data,
      };
      resolve(newResponse);
    } catch (err) {
      reject(err);
    }
  });
