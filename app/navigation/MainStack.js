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
  PointHistoryScreen,
  MySavedPointScreen,
  SupportScreen,
  ChangeLanguageScreen,
  ChangePasswordScreen,
  NotificationScreen,
  MenuItemDetailScreen,
  MyAddressScreen,
  DetailMyAddressScreen,
  SearchAddressScreen,
  MyOrdersScreen,
  DeitalOrdersScreen,
  OrderScreen,
  MyRewardScreen,
  StorePickupScreen,
  NewsScreen,
  MenuScreen,
  HomeScreen,
} from '../screens';
import { StyleSheet, View, Image } from 'react-native';
import { AppStyles, images } from '@theme';
import { translate } from '@localize';
import { HeaderImage } from '@components';
import { scale } from '@utils';

const { scaleHeight } = scale;

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
      initialRouteName={ScreenName.NewHome}
      headerMode="screen"
      screenOptions={{
        ...AppStyles.navigation.default,
        headerStyle: {
          backgroundColor: AppStyles.colors.accent,
          height: scaleHeight(100),
        },
        headerTitleStyle: {
          fontFamily: 'SVN-Merge',
          fontSize: scaleHeight(18),
          color: AppStyles.colors.primary,
        },
        headerBackImage: () => <HeaderImage src={images.icons.nav_back} />,
        gestureEnabled: false,
      }}>
      {/* <Stack.Screen
        component={MainTabScreen}
        name={ScreenName.Main}
        options={{ headerShown: false }}
      /> */}

      <Stack.Screen
        component={HomeScreen}
        name={ScreenName.NewHome}
        options={{
          headerShown: true,
          headerTitle: '',
          headerBackground: () => <View style={styles.container} />,
        }}
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
        options={{
          headerShown: true,
          headerTitle: translate('txtOrderMenu'),
          headerBackground: () => <View style={styles.container} />,
          headerBackImage: () => (
            <HeaderImage src={images.icons.ic_header_back} />
          ),
        }}
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
        component={PointHistoryScreen}
        name={ScreenName.HistorySavedPoint}
        options={{
          headerShown: true,
          headerTitle: translate('txtSavedPointHistory'),
          headerBackground: () => <View style={styles.container} />,
        }}
      />

      <Stack.Screen
        component={MySavedPointScreen}
        name={ScreenName.MySavedPoint}
        options={{
          headerShown: true,
          headerTitle: translate('txtMyRewardPoint'),
          headerBackground: () => <View style={styles.container} />,
        }}
      />

      <Stack.Screen
        component={SupportScreen}
        name={ScreenName.Support}
        options={{
          headerShown: true,
          headerTitle: translate('txtSupport'),
          headerBackground: () => <View style={styles.container} />,
        }}
      />

      <Stack.Screen
        component={ChangePasswordScreen}
        name={ScreenName.ChangePassword}
        options={{
          headerShown: true,
          headerTitle: translate('txtChangePassword'),
          headerBackground: () => <View style={styles.container} />,
        }}
      />

      <Stack.Screen
        component={ChangeLanguageScreen}
        name={ScreenName.ChangeLanguage}
        options={{
          headerShown: true,
          headerTitle: translate('txtChangeLanguage'),
          headerBackground: () => <View style={styles.container} />,
        }}
      />

      <Stack.Screen
        component={NotificationScreen}
        name={ScreenName.Notification}
        options={{
          headerShown: true,
          headerTitle: translate('txtNotification'),
          headerBackground: () => <View style={styles.container} />,
          headerRight: (props) => (
            <View style={styles.icon}>
              <Image source={images.icons.ic_delete} resizeMode="contain" />
            </View>
          ),
        }}
      />

      <Stack.Screen
        component={MenuItemDetailScreen}
        name={ScreenName.MenuItemDetail}
        options={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}
      />

      <Stack.Screen
        component={MyAddressScreen}
        name={ScreenName.MyAddress}
        options={{
          headerShown: true,
          headerTitle: translate('txtMyAddress'),
        }}
      />

      <Stack.Screen
        component={DetailMyAddressScreen}
        name={ScreenName.DetailMyAddress}
        options={{
          headerShown: true,
          headerTitle: translate('txtMyAddressDetail'),
          headerBackImage: () => (
            <HeaderImage src={images.icons.ic_close_blur} />
          ),
        }}
      />

      <Stack.Screen
        component={SearchAddressScreen}
        name={ScreenName.SearchAddress}
        options={{
          headerShown: true,
          headerTitle: translate('txtSearchAddress'),
        }}
      />

      <Stack.Screen
        component={MyOrdersScreen}
        name={ScreenName.MyOrders}
        options={{
          headerShown: true,
          headerTitle: translate('txtMyOrders'),
        }}
      />
      <Stack.Screen
        component={DeitalOrdersScreen}
        name={ScreenName.DeitalOrders}
        options={{
          headerTitle: '',
        }}
      />

      <Stack.Screen
        component={OrderScreen}
        name={ScreenName.Order}
        options={{
          headerShown: true,
          headerTitle: translate('txtOrder'),
          headerBackImage: () => (
            <HeaderImage src={images.icons.ic_close_blur} />
          ),
        }}
      />

      <Stack.Screen
        component={MyRewardScreen}
        name={ScreenName.MyReward}
        options={{
          headerShown: true,
          headerTitle: translate('txtMyReward'),
        }}
      />

      <Stack.Screen
        component={StorePickupScreen}
        name={ScreenName.StorePickup}
        options={{
          headerShown: true,
          headerTitle: translate('txtStore'),
          headerBackImage: () => (
            <HeaderImage src={images.icons.ic_close_blur} />
          ),
        }}
      />

      <Stack.Screen
        component={NewsScreen}
        name={ScreenName.News}
        options={{
          headerShown: true,
          headerTitle: translate('txtNews'),
        }}
      />

      <Stack.Screen
        component={MenuScreen}
        name={ScreenName.Menu}
        options={{
          headerShown: true,
          headerTitle: translate('txtMenu'),
          headerBackground: () => <View style={styles.container} />,
          headerBackImage: () => (
            <HeaderImage src={images.icons.ic_close_blur} />
          ),
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

  icon: {
    backgroundColor: '#FFC522',
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});

export default MainStack;
