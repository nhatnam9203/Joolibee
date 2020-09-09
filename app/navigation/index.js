import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { navigationRef } from './NavigationService';

function App() {
  const isLogIn = useSelector((state) => state.account.isLogin);

  return (
    <NavigationContainer ref={navigationRef}>
      {isLogIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
