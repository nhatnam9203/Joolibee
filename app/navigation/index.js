import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ScreenName, SplashScreen } from '../screens';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { navigationRef } from './NavigationService';
import { useAppProcess } from './useAppProcess';

const Stack = createStackNavigator();

function SplashStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={SplashScreen} name={ScreenName.Splash} />
    </Stack.Navigator>
  );
}

// Process Start App
function App() {
  const { startApp, isSignIn } = useAppProcess();

  return (
    <NavigationContainer ref={navigationRef}>
      {startApp ? <SplashStack /> : isSignIn ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
