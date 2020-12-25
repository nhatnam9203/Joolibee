import React from 'react';
import { View, Platform } from 'react-native';
import { getCurrentPosition, reverseGeocoding } from '@location';
import { setting, app } from '@slices';
import { useDispatch } from 'react-redux';
import {
  request,
  check,
  PERMISSIONS,
  RESULTS,
  checkNotifications,
  requestNotifications,
} from 'react-native-permissions';

const RootPermission = () => {
  const dispatch = useDispatch();

  // Check trường hợp người dùng tắt đi
  const checcPermissionLocation = () => {
    check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then((result) => {
        dispatch(setting.allowLocations(result)); // save to show select area
        switch (result) {
          case RESULTS.UNAVAILABLE:
            Logger.debug(
              'This feature is not available (on this device / in this context)',
            );

            break;
          case RESULTS.DENIED:
            Logger.debug(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            Logger.debug('The permission is granted');
            requestCurrentLocation();

            break;
          case RESULTS.BLOCKED:
            Logger.debug(
              'The permission is denied and not reques table anymore',
            );
            break;
        }
      })
      .catch((error) => {
        // …
        console.log(error);
      });
  };

  const checkPermissionNotify = async () => {
    checkNotifications().then(({ status, settings }) => {
      if (status === 'blocked') {
        requestNotifications(['alert', 'sound']).then((notify) => {
          Logger.debug(notify, '=======> checkPermissionNotify notify');
        });
      }
    });
  };

  const requestCurrentLocation = async () => {
    try {
      let result = await getCurrentPosition();
      const myLocations = {
        lat: result.coords.latitude,
        lng: result.coords.longitude,
      };

      const response = await reverseGeocoding(myLocations);
      const location = response[0];
      dispatch(app.setCurrentLocation(location));
    } catch (error) {}
  };

  React.useEffect(() => {
    checcPermissionLocation();
    // checkPermissionNotify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <View />;
};

export default RootPermission;
