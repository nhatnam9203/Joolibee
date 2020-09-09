import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '@slices/account';

const WelcomeScreen = () => {
  const dispatch = useDispatch();

  const loginCall = React.useCallback(() => {
    const action = login({ username: 'username', password: 'password' });
    dispatch(action);
  }, [dispatch]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // loginCall();
    }, 1000);

    return () => clearInterval(interval);
  }, [loginCall]);

  return <View style={{ flex: 1, backgroundColor: 'blue' }}></View>;
};

export default WelcomeScreen;
