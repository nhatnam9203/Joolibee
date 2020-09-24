import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {
  BottomBarComponent,
  HomePageName,
  MenuPageName,
  PromotionPageName,
  StorePageName,
} from '../components';
import { HomePage, MenuPage, PromotionPage, StorePage } from './pages';

const MainTab = createBottomTabNavigator();

function MainTabScreen() {
  return (
    <MainTab.Navigator tabBar={(props) => <BottomBarComponent {...props} />}>
      <MainTab.Screen name={HomePageName} component={HomePage} />
      <MainTab.Screen name={PromotionPageName} component={PromotionPage} />
      <MainTab.Screen name={MenuPageName} component={MenuPage} />
      <MainTab.Screen name={StorePageName} component={StorePage} />
    </MainTab.Navigator>
  );
}

export default MainTabScreen;
