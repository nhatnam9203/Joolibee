import { HeaderImage } from '@components';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStyles, images } from '@theme';
import * as React from 'react';
import {
  ScreenName,
  SignInScreen,
  SignUpScreen,
  WelcomeScreen,
} from '../screens';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.Welcome}
      screenOptions={{
        ...AppStyles.navigation.default,
        headerBackImage: () => <HeaderImage src={images.icons.nav_back} />,
      }}>
      <Stack.Screen component={WelcomeScreen} name={ScreenName.Welcome} />
      <Stack.Screen component={SignUpScreen} name={ScreenName.SignUp} />
      <Stack.Screen component={SignInScreen} name={ScreenName.SignIn} />
    </Stack.Navigator>
  );
}

export default AuthStack;
