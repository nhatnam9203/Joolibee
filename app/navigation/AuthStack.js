import { HeaderImage } from '@components';
import { translate } from '@localize';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStyles, images } from '@theme';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ScreenName,
  SignInScreen,
  SignUpScreen,
  WelcomeScreen,
  ForgotPasswordScreen,
} from '../screens';

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
          // headerBackImage: () => <View />,
          // headerStyle: { backgroundColor: 'transparent' },
          headerBackground: () => <View style={styles.container} />,
        }}
      />

      <Stack.Screen
        component={SignInScreen}
        name={ScreenName.SignIn}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        component={ForgotPasswordScreen}
        name={ScreenName.ForgotPassword}
        options={{
          headerShown: true,
          headerTitle: translate('txtForgotPassword'),
          // headerBackImage: () => <View />,
          // headerStyle: { backgroundColor: 'transparent' },
          headerBackground: () => <View style={styles.container} />,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.accent,
  },
});

export default AuthStack;
