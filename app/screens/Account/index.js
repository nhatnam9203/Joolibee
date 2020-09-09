import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';

import { MyAccountPage } from './pages';

const AccountStack = createNativeStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen component={MyAccountPage} name={'MyAccount'} />
    </AccountStack.Navigator>
  );
}

export default AccountStackScreen;
