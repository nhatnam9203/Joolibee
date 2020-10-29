import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { account, app, order } from '@slices';
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  BottomBarComponent,
  HomePageName,
  MenuPageName,
  PopupComingSoon,
  PopupOrderList,
  PopupQRCode,
  PromotionPageName,
  StorePageName,
} from '../components';
import { HomePage, MenuPage, PromotionPage, StorePage } from './pages';

const MainTab = createBottomTabNavigator();

function MainTabScreen() {
  const dispatch = useDispatch();
  const showOrderList = useSelector((state) => state.app.isShowOrderList);
  const showQRCode = useSelector((state) => state.account?.isShowQRCode);
  const showComingSoon = useSelector((state) => state.app.comingSoonShow);

  return (
    <View style={styles.container}>
      <MainTab.Navigator tabBar={(props) => <BottomBarComponent {...props} />}>
        <MainTab.Screen name={HomePageName} component={HomePage} />
        <MainTab.Screen name={PromotionPageName} component={PromotionPage} />
        <MainTab.Screen name={MenuPageName} component={MenuPage} />
        <MainTab.Screen name={StorePageName} component={StorePage} />
      </MainTab.Navigator>

      {/**Popup Order List Items */}
      <PopupOrderList
        visible={showOrderList}
        onToggle={() => dispatch(app.dismissOrderList())}
      />

      {/**Popup QR Code */}
      <PopupQRCode
        visible={showQRCode}
        onToggle={() => dispatch(account.dismissQRCode())}
      />

      {/**Popup ComingSoon */}
      <PopupComingSoon
        visible={showComingSoon}
        onToggle={() => dispatch(app.dismissComingSoon())}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });

export default MainTabScreen;
