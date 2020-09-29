import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { navigationRef } from './NavigationService';

import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen, ScreenName } from '../screens';
const Stack = createStackNavigator();

function SplashStack() {
  return (
    <Stack.Navigator initialRouteName={ScreenName.Main} headerMode="none">
      <Stack.Screen component={SplashScreen} name={ScreenName.Splash} />
    </Stack.Navigator>
  );
}
function App() {
  const isLogIn = useSelector((state) => state.account.isLogin);
  const loading = useSelector((state) => state.app.loading_app);
  return (
    <NavigationContainer ref={navigationRef}>
    {loading ? <SplashStack /> : !isLogIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
