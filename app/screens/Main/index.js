import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  BottomBarComponent,
  HomePageName,
  MenuPageName,
  PromotionPageName,
  StorePageName,
  PopupOrderList,
} from '../components';
import { HomePage, MenuPage, PromotionPage, StorePage } from './pages';
import { useSelector, useDispatch } from 'react-redux';
import { dismissOrderList } from '@slices/order';
import { StyleSheet, View } from 'react-native';

const MainTab = createBottomTabNavigator();

function MainTabScreen() {
  const dispatch = useDispatch();
  const showOrderList = useSelector((state) => state.order.isShowOrderList);

  return (
    <View style={styles.container}>
      <MainTab.Navigator tabBar={(props) => <BottomBarComponent {...props} />}>
        <MainTab.Screen name={HomePageName} component={HomePage} />
        <MainTab.Screen name={PromotionPageName} component={PromotionPage} />
        <MainTab.Screen name={MenuPageName} component={MenuPage} />
        <MainTab.Screen name={StorePageName} component={StorePage} />
      </MainTab.Navigator>
      <PopupOrderList
        visible={showOrderList}
        onToggle={() => dispatch(dismissOrderList())}
      />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1 } });

export default MainTabScreen;
