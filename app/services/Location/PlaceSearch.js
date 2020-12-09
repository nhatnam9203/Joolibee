import Config from 'react-native-config';
const queryString = require('query-string');

const default_url = `/place/findplacefromtext/json?key=${Config.GOOGLE_API_KEY}&language=vi&fields=photos,formatted_address,name,rating,opening_hours,geometry&&inputtype=textquery&`;

export const placeSearch = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const stringified = queryString.stringify(params);
      //   const stringified = encodeURI(params);

      const url = Config.MAPS_ENDPOINT + default_url + stringified;

      const response = await fetch(url);
      const resJson = await response.json();

      let newResponse = {
        status: resJson.status,
        data: resJson.candidates,
      };
      resolve(newResponse);
    } catch (err) {
      reject(err);
    }
  });
