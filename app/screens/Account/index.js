import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MyAccountPage } from './pages';

const AccountStack = createStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen component={MyAccountPage} name={'MyAccount'} />
    </AccountStack.Navigator>
  );
}

export default AccountStackScreen;
