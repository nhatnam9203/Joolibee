import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';

const MyAccountPage = () => {
  const dispatch = useDispatch();

  return <View style={{ flex: 1, backgroundColor: 'blue' }}></View>;
};

export default MyAccountPage;
