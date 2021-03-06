import { translate } from '@localize';
import { AppStyles, images, metrics } from '@theme';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useChangeLanguage } from '@hooks';

export const HomePageName = 'Home';
export const PromotionPageName = 'Promotion';
export const MenuPageName = 'Menu';
export const StorePageName = 'Store';

export const BottomBarComponent = ({ state, descriptors, navigation }) => {
  const routes = {
    Home: {
      title: translate('tabHome'),
      icon: images.icons.tab_home,
    },
    Promotion: {
      title: translate('tabPromotion'),
      icon: images.icons.tab_promotion,
    },
    Menu: {
      title: translate('tabMenu'),
      icon: images.icons.tab_menu,
    },
    Store: {
      title: translate('tabStore'),
      icon: images.icons.tab_store,
    },
  };
  const [language] = useChangeLanguage();

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

        const color = isFocused
          ? AppStyles.colors.accent
          : AppStyles.colors.text;

        const fontWeight = isFocused ? 'bold' : 'normal';

        return (
          <TouchableOpacity
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={styles.buttonStyle}>
            {language && routes[route.name]?.icon && (
              <Image
                style={[
                  styles.iconStyle,
                  {
                    tintColor: color,
                  },
                ]}
                source={routes[route.name]?.icon}
              />
            )}
            <Text
              style={[
                styles.labelStyle,
                {
                  color: color,
                  fontWeight: fontWeight,
                },
              ]}>
              {routes[route.name]?.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  barStyle: {
    height: metrics.tabBarHeight,
    padding: 0,
    backgroundColor: AppStyles.colors.primary,
    flexDirection: 'row',
    borderTopColor: AppStyles.colors.accent,
    borderTopWidth: 1,
  },

  labelStyle: {
    fontSize: 14,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    margin: 5,
    lineHeight: 21,
    textAlignVertical: 'center',
  },

  iconStyle: {
    height: 28,
    width: 35,
    resizeMode: 'center',
  },

  buttonStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
