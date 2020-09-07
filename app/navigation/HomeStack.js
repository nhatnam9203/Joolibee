import React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import {
  ScreenName,
  HomeScreen,
  MenuScreen,
  PromotionScreen,
  StoreScreen,
} from '../screens';
import { Image, StyleSheet } from 'react-native';
import { images, AppStyles } from '@theme';
import { translate } from '@localize';

function HomeStack() {
  const [index, setTabIndex] = React.useState(0);
  const routes = [
    {
      key: ScreenName.Home,
      title: translate('tabHome'),
      icon: images.icons.tab_home,
    },
    {
      key: ScreenName.Menu,
      title: translate('tabMenu'),
      icon: images.icons.tab_menu,
    },
    {
      key: ScreenName.Store,
      title: translate('tabStore'),
      icon: images.icons.tab_store,
    },
    {
      key: ScreenName.Promotion,
      title: translate('tabPromotion'),
      icon: images.icons.tab_promotion,
    },
  ];

  const renderIcon = ({ focused, route, color }) => {
    return (
      <Image
        style={[
          styles.imgBottomTab,
          {
            tintColor: color,
          },
        ]}
        source={route.icon}
      />
    );
  };

  const renderLabel = ({ focused, route, color }) => {
    return (
      <Text style={[styles.txtBottomTab, { color: color }]}>{route.title}</Text>
    );
  };

  const renderScene = BottomNavigation.SceneMap({
    Home: HomeScreen,
    Store: StoreScreen,
    Menu: MenuScreen,
    Promotion: PromotionScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setTabIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
      renderLabel={renderLabel}
      shifting={false}
      activeColor={AppStyles.colors.accent}
      inactiveColor={AppStyles.colors.text}
      sceneAnimationEnabled={false}
      barStyle={styles.barStyle}
    />
  );
}

const styles = StyleSheet.create({
  barStyle: {
    height: 77,
    padding: 0,
  },

  txtBottomTab: {
    fontSize: 12,
    color: 'red',
    textAlign: 'center',
    margin: 5,
    height: 20,
    paddingBottom: 5,
  },

  imgBottomTab: {
    height: 28,
    width: 35,
    resizeMode: 'center',
  },
});

export default HomeStack;
