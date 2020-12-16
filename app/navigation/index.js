import { GEX } from '@graphql';
import { useStorePickup } from '@hooks';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { scale } from '@utils';
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ScreenName, SplashScreen } from '../screens';
import AuthStack from './AuthStack';
import MainStack from './MainStack';
import { navigationRef } from './NavigationService';
import { useSignInFlow } from '../myhooks/useSignInFlow';
import { app } from '@slices';

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
  const dispatch = useDispatch();
  const [{ startApp, isSignIn }] = useSignInFlow();

  const [allowGotoHomeScreen, setAllowGotoHomeScreen] = React.useState(false);
  const [getHomeScreenResp, loadHomeScreen] = GEX.useLoadHomeScreen();
  const [, getCustomerCart] = GEX.useGetCustomerCart(); // load customer cart
  // const [customerCart, getCheckOutCart] = GEX.useGetCheckOutCart();
  const [, getCategoryList] = GEX.useGetCategoryList();
  const getStoreJsonData = GEX.useGetStoreInfo();
  const [, getNotifyList] = GEX.useGetNotifyList();

  React.useEffect(() => {
    if (startApp) {
      getStoreJsonData();
      navigationRef.current?.dispatch(StackActions.replace(ScreenConst.Splash));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startApp]);

  React.useEffect(() => {
    if (isSignIn) {
      setAllowGotoHomeScreen(true);
      loadHomeScreen();
      getCustomerCart();
      getCategoryList();
      getNotifyList();
    } else {
      // navigationRef.current?.navigate(ScreenConst.Auth);
      navigationRef.current?.dispatch(StackActions.replace(ScreenConst.Auth));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignIn]);

  React.useEffect(() => {
    if (getHomeScreenResp?.data && allowGotoHomeScreen) {
      navigationRef.current?.dispatch(StackActions.replace(ScreenConst.Main));

      dispatch(app.hideLoading());
      setAllowGotoHomeScreen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getHomeScreenResp?.data, allowGotoHomeScreen]);

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
