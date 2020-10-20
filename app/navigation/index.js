import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useSelector } from 'react-redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { navigationRef } from './NavigationService';
import { save, get, StorageKey } from '@storage';

import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen, ScreenName } from '../screens';
const Stack = createStackNavigator();

function SplashStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={SplashScreen} name={ScreenName.Splash} />
    </Stack.Navigator>
  );
}

function App() {
  const {
    user: { tokenKey },
  } = useSelector((state) => state.account);
  const loading = useSelector((state) => state.app.loading_app);

  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const loadToken = async () => {
      const tokenObject = await get(StorageKey.Token);
      Logger.debug(tokenObject, 'App -> useEffect');
      setToken(tokenObject[tokenKey]);
    };
    loadToken();
  }, [tokenKey]);

  return (
    <NavigationContainer ref={navigationRef}>
      {loading ? <SplashStack /> : tokenKey ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
