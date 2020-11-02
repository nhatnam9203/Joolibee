import Config from 'react-native-config';
const queryString = require('query-string');

const default_url = `/place/autocomplete/json?key=${Config.GOOGLE_API_KEY}&components=country:vn&`;

export const autocomplete = (params) =>
  new Promise(async (resolve, reject) => {
    try {
      const stringified = queryString.stringify(params);
      const url = Config.MAPS_ENDPOINT + default_url + stringified;
      console.log('url', url);
      const response = await fetch(url);
      const resJson = await response.json();
      let newResponse = {
        status: resJson.status,
        data: resJson.predictions,
      };
      resolve(newResponse);
    } catch (err) {
      reject(err);
      console.log(err);
    }
  });
