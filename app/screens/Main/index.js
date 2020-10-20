import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  BottomBarComponent,
  HomePageName,
  MenuPageName,
  PromotionPageName,
  StorePageName,
  PopupOrderList,
  PopupQRCode,
  PopupComingSoon,
} from '../components';
import { HomePage, MenuPage, PromotionPage, StorePage } from './pages';
import { useSelector, useDispatch } from 'react-redux';
import { dismissOrderList } from '@slices/order';
import { dismissQRCode } from '@slices/account';
import { dismissComingSoon } from '@slices/app';
import { StyleSheet, View } from 'react-native';

const MainTab = createBottomTabNavigator();

function MainTabScreen() {
  const dispatch = useDispatch();
  const showOrderList = useSelector((state) => state.order.isShowOrderList);
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
        onToggle={() => dispatch(dismissOrderList())}
      />

      {/**Popup QR Code */}
      <PopupQRCode
        visible={showQRCode}
        onToggle={() => dispatch(dismissQRCode())}
      />

      {/**Popup ComingSoon */}
      <PopupComingSoon
        visible={showComingSoon}
        onToggle={() => dispatch(dismissComingSoon())}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });

export default MainTabScreen;
