import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { MainTabScreen, AccountStackScreen, ScreenName } from '../screens';

const Stack = createNativeStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator headerMode="screen">
      <Stack.Screen
        component={MainTabScreen}
        name={ScreenName.Main}
        options={{ headerShown: false }}
      />
      <Stack.Screen component={AccountStackScreen} name={ScreenName.Account} />
    </Stack.Navigator>
  );
}

export default MainStack;
