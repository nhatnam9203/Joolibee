import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;

const defaultData = [
  {
    id: 1,
    icon: images.icons.ic_terrible_raiting,
    star: images.icons.ic_star_one,
    color: AppStyles.colors.accent,
  },
  {
    id: 2,
    icon: images.icons.ic_bad_raiting,
    star: images.icons.ic_star_two,
    color: AppStyles.colors.accent,
  },
  {
    id: 3,
    icon: images.icons.ic_sad_raiting,
    star: images.icons.ic_star_three,
    color: AppStyles.colors.button,
  },
  {
    id: 4,
    icon: images.icons.ic_good_raiting,
    star: images.icons.ic_star_four,
    color: AppStyles.colors.confirmed,
  },
  {
    id: 5,
    icon: images.icons.ic_verygood_raiting,
    star: images.icons.ic_star_five,
    color: AppStyles.colors.delivery,
  },
];

export const CustomRaiting = ({ onPress }) => {
  const [isSelected, onSelected] = React.useState(-1);
  const onHandlePress = (idx) => () => {
    onPress(defaultData[idx].id);
    onSelected(idx);
  };
  return (
    <View style={styles.container}>
      {defaultData.map((item, index) => (
        <RaitingItem
          item={item}
          selected={isSelected === index}
          onPress={onHandlePress(index)}
          selectedColor={item.color}
        />
      ))}
    </View>
  );
};

const RaitingItem = ({ item, selected, onPress, selectedColor }) => {
  const interpolatedColor = new Animated.Value(-1);
  React.useEffect(() => {
    Animated.timing(interpolatedColor, {
      duration: 500,
      toValue: selected ? 1 : -1,
      useNativeDriver: false,
      easing: Easing.in(),
    }).start();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const borderColor = interpolatedColor.interpolate({
    inputRange: [-1, 1],
    outputRange: [AppStyles.colors.inactive, selectedColor],
  });

  const borderWidth = interpolatedColor.interpolate({
    inputRange: [-1, 1],
    outputRange: [1, 2],
  });
  return (
    <TouchableOpacity key={item.id + ''} onPress={onPress} activeOpacity={1}>
      <Animated.View
        style={[
          styles.itemContainer,
          {
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
        ]}>
        <Image source={item.icon} />
        <Image source={item.star} style={{ flex: 1, resizeMode: 'contain' }} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: scaleWidth(19),
    alignItems: 'center',
    width: '100%',
    paddingVertical: scaleHeight(35),
  },

  itemContainer: {
    width: scaleWidth(62),
    height: scaleHeight(99),
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'space-between',
    paddingVertical: scaleHeight(10),
  },

  txtTitle: {
    fontSize: scaleHeight(14),
    color: AppStyles.colors.primary,
    ...AppStyles.fonts.SVN_Merge_Bold,
    paddingTop: scaleHeight(5),
  },

  img: {
    width: scaleWidth(50),
    height: scaleHeight(39),
    resizeMode: 'contain',
  },
});
