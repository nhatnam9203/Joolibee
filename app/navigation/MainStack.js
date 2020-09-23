import * as React from 'react';
// import { createNativeStackNavigator } from 'react-native-screens/native-stack'; // use api native
import { createStackNavigator } from '@react-navigation/stack';
import {
  MainTabScreen,
  MyAccountScreen,
  ScreenName,
  MenuDetailScreen,
  PromotionListScreen,
  SettingAccountScreen,
  EditAccountScreen,
  RewardScreen,
  NotificationScreen,
} from '../screens';
import { StyleSheet, View } from 'react-native';
import { AppStyles, images } from '@theme';
import { translate } from '@localize';
import { HeaderImage } from '@components';

// import { TransitionSpecs } from '@react-navigation/stack';
// import { CardStyleInterpolators } from '@react-navigation/stack';
// import { HeaderStyleInterpolators } from '@react-navigation/stack';
// import { TransitionPresets } from '@react-navigation/stack';

const Stack = createStackNavigator();
const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

function MainStack() {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.Main}
      headerMode="screen"
      screenOptions={{
        ...AppStyles.navigation.default,
        headerBackImage: () => <HeaderImage src={images.icons.nav_back} />,
        gestureEnabled: false,
      }}>
      <Stack.Screen
        component={MainTabScreen}
        name={ScreenName.Main}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={MyAccountScreen}
        name={ScreenName.Account}
        options={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}
      />

      <Stack.Screen
        component={MenuDetailScreen}
        name={ScreenName.MenuDetail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={PromotionListScreen}
        name={ScreenName.PromotionList}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        component={SettingAccountScreen}
        name={ScreenName.SettingAccount}
        options={{
          headerShown: true,
          headerTitle: translate('txtSetting'),
          headerBackground: () => <View style={styles.container} />,
        }}
      />

      <Stack.Screen
        component={EditAccountScreen}
        name={ScreenName.EditAccount}
        options={{
          headerShown: true,
          headerTitle: translate('txtEditAccount'),
          headerBackground: () => <View style={styles.container} />,
        }}
      />

      <Stack.Screen
        component={RewardScreen}
        name={ScreenName.Reward}
        options={{
          headerShown: true,
          headerTitle: translate('txtReward'),
          headerBackground: () => <View style={styles.container} />,
        }}
      />

      <Stack.Screen
        component={NotificationScreen}
        name={ScreenName.HistorySavedPoint}
        options={{
          headerShown: true,
          headerTitle: translate('txtSavedPointHistory'),
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

export default MainStack;
