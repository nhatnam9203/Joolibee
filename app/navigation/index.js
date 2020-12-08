import { GEX } from '@graphql';
import { useStorePickup } from '@hooks';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { scale } from '@utils';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { ScreenName, SplashScreen } from '../screens';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { navigationRef } from './NavigationService';
import { useAppProcess } from './useAppProcess';

const { scaleHeight, scaleWidth } = scale;

const Stack = createStackNavigator();

function SplashStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={SplashScreen} name={ScreenName.Splash} />
    </Stack.Navigator>
  );
}

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const ScreenConst = {
  Splash: 'joPlash',
  Main: 'joMain',
  Auth: 'joAuth',
};

// Process Start App
function App() {
  const { startApp, isSignIn } = useAppProcess();
  const isLogin = useSelector((state) => state.account?.user?.isLogin);

  const [allowGotoHomeScreen, setAllowGotoHomeScreen] = React.useState(false);
  const [getHomeScreenResp, loadHomeScreen] = GEX.useLoadHomeScreen();
  // const [customerCart, getCustomerCart] = GEX.useGetCustomerCart(); // load customer cart
  const [customerCart, getCheckOutCart] = GEX.useGetCheckOutCart();
  const [categoryListResp, getCategoryList] = GEX.useGetCategoryList();
  const getStoreJsonData = GEX.useGetStoreInfo();
  const storeList = useStorePickup();

  React.useEffect(() => {
    if (!startApp) {
      getStoreJsonData();
      goToHomeScreen();
    } else {
      // navigationRef.current?.navigate(ScreenConst.Splash);
      // StackActions.replace(ScreenConst.Splash);
      navigationRef.current?.dispatch(StackActions.replace(ScreenConst.Splash));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startApp, isLogin]);

  const goToHomeScreen = React.useCallback(() => {
    if (isLogin) {
      getCheckOutCart();
      getCategoryList();
      loadHomeScreen();
    } else {
      // navigationRef.current?.navigate(ScreenConst.Auth);
      navigationRef.current?.dispatch(StackActions.replace(ScreenConst.Auth));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin]);

  // Khi có dữ liệu home screen sẽ cho vào home screen, KO CÓ ĂN CÁM !!!
  React.useEffect(() => {
    if (getHomeScreenResp?.data) {
      setAllowGotoHomeScreen(true);

      navigationRef.current?.dispatch(StackActions.replace(ScreenConst.Main));

      // navigationRef.current?.navigate(ScreenConst.Main);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHomeScreenResp?.data]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={ScreenConst.Splash}
        headerMode="none"
        screenOptions={{
          gestureEnabled: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}>
        <Stack.Screen
          component={SplashStack}
          name={ScreenConst.Splash}
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        />

        <Stack.Screen
          component={MainStack}
          name={ScreenConst.Main}
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        />

        <Stack.Screen
          component={AuthStack}
          name={ScreenConst.Auth}
          options={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
