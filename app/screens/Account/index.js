import { HeaderImage } from '@components';
import { translate } from '@localize';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStyles, images, metrics } from '@theme';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import * as constants from './constants';
import { MyAccountPage, SettingAccountPage } from './pages';

const AccountStack = createStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator
      screenOptions={{
        ...AppStyles.navigation.default,
        headerBackImage: () => <HeaderImage src={images.icons.nav_back} />,
      }}>
      <AccountStack.Screen
        component={MyAccountPage}
        name={constants.Account}
        options={{ headerShown: false }}
      />

      <AccountStack.Screen
        component={SettingAccountPage}
        name={constants.SettingAccount}
        options={{
          headerShown: true,
          headerTitle: translate('txtSetting'),
        }}
      />
    </AccountStack.Navigator>
  );
}

const styles = StyleSheet.create({});

export default AccountStackScreen;
