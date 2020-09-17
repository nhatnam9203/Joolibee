import React from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '@slices/account';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../ScreenName';

const WelcomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const loginCall = React.useCallback(() => {
    const action = login({ username: 'username', password: 'password' });
    dispatch(action);
  }, [dispatch]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      // loginCall();
      navigation.navigate(ScreenName.SignIn);
    }, 1000);

    return () => clearInterval(interval);
  }, [navigation]);

  return <View style={{ flex: 1, backgroundColor: 'blue' }}></View>;
};

export default WelcomeScreen;
