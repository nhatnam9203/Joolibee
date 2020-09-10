import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { MyAccountPage, SettingAccountPage } from './pages';
import * as constants from './constants';

const AccountStack = createStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        component={MyAccountPage}
        name={constants.Account}
        options={{ headerShown: false }}
      />

      <AccountStack.Screen
        component={SettingAccountPage}
        name={constants.SettingAccount}
        options={{ headerShown: true }}
      />
    </AccountStack.Navigator>
  );
}

export default AccountStackScreen;
