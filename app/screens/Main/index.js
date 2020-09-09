import * as React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { BottomNavigation, Text } from 'react-native-paper';
import { HomePage, MenuPage, PromotionPage, StorePage } from './pages';
import { Image, StyleSheet } from 'react-native';
import { images, AppStyles } from '@theme';
import { translate } from '@localize';
import * as constants from './Constants';
import { BottomBarComponent } from './components';

const MainTab = createBottomTabNavigator();

function MainTabScreen() {
  return (
    <MainTab.Navigator
      headerMode="single"
      tabBar={(props) => <BottomBarComponent {...props} />}>
      <MainTab.Screen name={constants.HomePage} component={HomePage} />
      <MainTab.Screen name={constants.MenuPage} component={MenuPage} />
      <MainTab.Screen
        name={constants.PromotionPage}
        component={PromotionPage}
      />
      <MainTab.Screen name={constants.StorePage} component={StorePage} />
    </MainTab.Navigator>
  );
}

export default MainTabScreen;
