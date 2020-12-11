import Geolocation from '@react-native-community/geolocation';
import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
const options = {
  enableHighAccuracy: false,
  timeout: 20000,
  maximumAge: 2000,
};

const useGeolocation = (props) => {
  const [position, setPosition] = useState({});

  // const subscribeLocationLocation = () => {
  //     return watchID = Geolocation.watchPosition(
  //         (position) => {
  //             const initialPosition = JSON.stringify(position);
  //             setPosition(initialPosition)
  //         },
  //         (error) => {
  //             alert(error.message)
  //         },
  //         options
  //     );
  // };

  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const initialPosition = JSON.stringify(position);
        setPosition(initialPosition);
      },

      (error) => alert(error.message),
      options,
    );
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
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
            getOneTimeLocation();
          }
        } catch (err) {
          Logger.log(err, '===> useGeolocation');
        }
      }
    };
    requestLocationPermission();
    return () => {
      setPosition({});
    };
  }, []);

  return position;
};

export default useGeolocation;
