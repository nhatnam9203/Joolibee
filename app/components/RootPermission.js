import React from 'react';
import { View, Platform } from 'react-native';
import { getCurrentPosition } from '@location';
import { setting, store } from '@slices';
import { useDispatch } from 'react-redux';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

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
        dispatch(setting.allowLocations(result));
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );

            break;
          case RESULTS.DENIED:
            console.log(
              'The permission has not been requested / is denied but requestable',
            );
            break;
          case RESULTS.GRANTED:
            console.log('The permission is granted');
            break;
          case RESULTS.BLOCKED:
            console.log('The permission is denied and not requestable anymore');
            break;
        }
      })
      .catch((error) => {
        // …
        console.log(error);
      });
  };

  React.useEffect(() => {
    const requestCurrentLocation = async () => {
      try {
        let result = await getCurrentPosition();
        const myLocations = {
          lat: result.coords.latitude,
          lng: result.coords.longitude,
        };
        dispatch(store.getPosition(myLocations, { dispatch }));
      } catch (error) {}
    };
    requestCurrentLocation();
  }, [dispatch]);

  React.useEffect(() => {
    checcPermissionLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <View />;
};

export default RootPermission;
