import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { navigationRef } from './NavigationService';
import { save, get, StorageKey, remove } from '@storage';
import { account } from '@slices';
import { useMutation } from '@apollo/client';
import { mutation } from '@graphql';

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

  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.account?.user?.isLogin);
  const isLogout = useSelector((state) => state.account?.isLogout);
  const loading = useSelector((state) => state.app.loading_app);

  const [token, setToken] = React.useState(null);

  const [revokeCustomerToken, { client }] = useMutation(mutation.SIGN_OUT);

  React.useEffect(() => {
    const loadToken = async () => {
      if (isLogin) {
        const user = await get(StorageKey.User);
        setToken(user?.token);
      } else {
        setToken(null);
      }
    };
    loadToken();
  }, [isLogin]);

  React.useEffect(() => {
    const onSignOut = async () => {
      await revokeCustomerToken();
      await client.cache.reset();

      // reset redux
      await remove(StorageKey.User);
    };

    if (isLogout) {
      onSignOut();
      dispatch(account.signOutComplete());
    }
  }, [client, dispatch, isLogout, revokeCustomerToken]);

  return (
    <NavigationContainer ref={navigationRef}>
      {loading ? <SplashStack /> : token ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default App;
