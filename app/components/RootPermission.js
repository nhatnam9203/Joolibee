import React from 'react';
import { View } from 'react-native';
import { getCurrentPosition } from '@location';
import { store } from '@slices';
import { useDispatch } from 'react-redux';
import { request, check, PERMISSIONS, RESULTS } from 'react-native-permissions';

const RootPermission = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const requestCurrentLocation = async () => {
      try {
        let result = await getCurrentPosition();
        console.log(result, 'asdasdjashdgjashdgash');
        const myLocations = {
          lat: result.coords.latitude,
          lng: result.coords.longitude,
        };
        dispatch(store.getPosition(myLocations, { dispatch }));
      } catch (error) {}
    };

    requestCurrentLocation();
  }, [dispatch]);

  return <View />;
};

export default RootPermission;
