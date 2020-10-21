import React from 'react';
import { View } from 'react-native';
import { getCurrentPosition } from '@location';
import { store } from '@slices';
import { useDispatch } from 'react-redux';

const RootPermission = () => {
  const dispatch = useDispatch();

  const requestCurrentLocation = async () => {
    try {
      let result = await getCurrentPosition();
      let latlng = {
        lat: result.coords.latitude,
        lng: result.coords.longitude,
      };
      dispatch(store.getPosition(latlng, { dispatch }));
    } catch (error) {}
  };

  React.useEffect(() => {
    requestCurrentLocation();
  }, []);

  return <View />;
};

export default RootPermission;