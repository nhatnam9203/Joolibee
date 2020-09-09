import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MainTabScreen, AccountStackScreen, ScreenName } from '../screens';

const Stack = createStackNavigator();

function MainStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen component={MainTabScreen} name={ScreenName.Main} />
      <Stack.Screen component={AccountStackScreen} name={ScreenName.Account} />
    </Stack.Navigator>
  );
}

export default MainStack;
