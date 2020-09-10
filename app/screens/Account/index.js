import { translate } from '@localize';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStyles, images, metrics } from '@theme';
import * as React from 'react';
import { Image, StyleSheet } from 'react-native';
import * as constants from './constants';
import { MyAccountPage, SettingAccountPage } from './pages';

const AccountStack = createStackNavigator();

function AccountStackScreen() {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerStyle: { backgroundColor: AppStyles.colors.accent },
        headerTitleStyle: AppStyles.styles.headerTitleStyle,
        headerBackImage: () => (
          <Image
            source={images.icons.nav_back}
            style={styles.headerBackImageStyle}
          />
        ),
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

const styles = StyleSheet.create({
  headerBackImageStyle: {
    tintColor: '#fff',
    width: 45,
    height: 45,
    margin: metrics.margin,
    resizeMode: 'center',
  },
});

export default AccountStackScreen;
