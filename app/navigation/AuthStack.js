import { HeaderImage } from '@components';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStyles, images, metrics } from '@theme';
import * as React from 'react';
import {
  ScreenName,
  SignInScreen,
  SignUpScreen,
  WelcomeScreen,
} from '../screens';
import { translate } from '@localize';
import { View } from 'react-native';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.Welcome}
      screenOptions={{
        ...AppStyles.navigation.default,
        headerBackImage: () => <HeaderImage src={images.icons.nav_back} />,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        component={WelcomeScreen}
        name={ScreenName.Welcome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={SignUpScreen}
        name={ScreenName.SignUp}
        options={{
          headerShown: true,
          headerTitle: translate('txtSignUp'),
          headerBackImage: () => <View />,
        }}
      />

      <Stack.Screen
        component={SignInScreen}
        name={ScreenName.SignIn}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
