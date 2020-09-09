import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { BottomBarComponent } from './components';
import * as constants from './Constants';
import { HomePage, MenuPage, PromotionPage, StorePage } from './pages';

const MainTab = createBottomTabNavigator();

function MainTabScreen() {
  return (
    <MainTab.Navigator tabBar={(props) => <BottomBarComponent {...props} />}>
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
