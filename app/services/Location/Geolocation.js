import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';
import Geocoder from 'react-native-geocoder';

import Config from 'react-native-config';
const queryString = require('query-string');

const default_url = `/geocode/json?key=${Config.GOOGLE_API_KEY}&language=vi&&components=country:VN&region=vn&`;

const options = {
  enableHighAccuracy: false,
  timeout: 20000,
  maximumAge: 2000,
};

export const subscribeLocationLocation = () => {
  return new Promise((resolve, reject) => {
    Geolocation.watchPosition(resolve, reject, options);
  });
};

const getOneTimeLocation = (resolve, reject) => {
  return Geolocation.getCurrentPosition(resolve, reject, options);
};

export const getCurrentPosition = () =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      getOneTimeLocation(resolve, reject);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getOneTimeLocation(resolve, reject);
        }
      } catch (err) {
        console.log(err);
      }
    }
  });

export const reverseGeocoding = async (options) => {
  try {
    const res = await Geocoder.geocodePosition(options);
    return res;
  } catch (err) {
    console.log(err);
  }
  // const url = Config.MAPS_ENDPOINT + `/geocode/json?key=${Config.GOOGLE_MAPS_API_KEY}&latlng=${lat},${lng}`;
  // console.log('url',url)
  // return new Promise((resolve, reject) => {
  //     fetch(url)
  //         .then(resp => resp.json())
  //         .then(json => {
  //             console.log(json)
  //             resolve(json)
  //         })
  //         .catch(error => reject(error));
  // })
};

// export const geocodeAddress = async (address) => {
//   Logger.debug(address, 'address ========>');

//   try {
//     const res = await Geocoder.geocodePosition(queryString.stringify(address));
//     return res;
//   } catch (err) {
//     console.log(err);
//   }
// };

export const geocodeAddress = async (address) => {
  return new Promise(async (resolve, reject) => {
    try {
      const stringified = queryString.stringify({ address });
      const url = Config.MAPS_ENDPOINT + default_url + stringified;

      const response = await fetch(url);
      const resJson = await response.json();
      let newResponse = {
        status: resJson?.status,
        data: resJson?.results?.find(Boolean),
      };
      resolve(newResponse);
    } catch (err) {
      reject(err);
      console.log(err);
    }
  });
};
