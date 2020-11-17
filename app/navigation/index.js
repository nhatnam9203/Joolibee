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
  // !TODO: xử lí login chưa đc

  const isLogin = useSelector((state) => state.account?.user?.isLogin);
  const loading = useSelector((state) => state.app.loading_app);
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    const loadToken = async () => {
      Logger.debug(StorageKey.User, 'StorageKey.User > App');
      if (isLogin) {
        const user = await get(StorageKey.User);
        setToken(user?.token);
      } else {
        setToken(null);
      }
    };
    loadToken();
  }, [isLogin]);

  return (
    <NavigationContainer ref={navigationRef}>
      {loading ? <SplashStack /> : token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
