import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as constants from '../Constants';

const routes = {
  [constants.HomePage]: {
    title: translate('tabHome'),
    icon: images.icons.tab_home,
  },
  [constants.MenuPage]: {
    title: translate('tabMenu'),
    icon: images.icons.tab_menu,
  },
  [constants.StorePage]: {
    title: translate('tabStore'),
    icon: images.icons.tab_store,
  },
  [constants.PromotionPage]: {
    title: translate('tabPromotion'),
    icon: images.icons.tab_promotion,
  },
};

function BottomBarComponent({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={styles.barStyle}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={styles.buttonTab}>
            {routes[route.name]?.icon && (
              <Image
                style={[
                  styles.imgBottomTab,
                  {
                    tintColor: isFocused
                      ? AppStyles.colors.accent
                      : AppStyles.colors.text,
                  },
                ]}
                source={routes[route.name]?.icon}
              />
            )}
            <Text
              style={[
                styles.txtBottomTab,
                {
                  color: isFocused
                    ? AppStyles.colors.accent
                    : AppStyles.colors.text,
                },
              ]}>
              {routes[route.name]?.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    height: 77,
    padding: 0,
    backgroundColor: AppStyles.colors.primary,
    flexDirection: 'row',
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

  buttonTab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomBarComponent;
