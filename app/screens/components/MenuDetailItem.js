import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AppStyles, images } from '@theme';
import { CustomCheckBox, CustomInput } from '@components';

export const SelectType = {
  Radio: 'radio',
  Multiline: 'multiline',
  None: 'none',
};

export const MenuDetailItem = ({
  item,
  onPress,
  type = SelectType.Multiline,
}) => {
  const [selected, setSelected] = React.useState(false);

  const itemPress = () => {
    if (typeof onPress === 'function') {
      onPress(item);
    } else {
      setSelected((prev) => !prev);
    }
  };

  const renderSelectType = () => {
    switch (type) {
      case SelectType.Radio:
      default:
        return (
          <Image
            style={styles.arrowStyle}
            source={
              selected
                ? images.icons.ic_radio_active
                : images.icons.ic_radio_inactive
            }
          />
        );
      case SelectType.Multiline:
        return (
          <View style={styles.multilineSelectContent}>
            <CustomInput
              style={styles.mulInputStyle}
              textAlign="center"
              keyboardType="numeric"
            />
            <CustomCheckBox
              normalColor={AppStyles.colors.accent}
              selectedColor={AppStyles.colors.accent}
            />
          </View>
        );
      case SelectType.None:
        return null;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={itemPress}>
      <Image style={styles.imageStyle} source={item.image} />
      <View style={styles.textContentStyle}>
        <Text style={styles.textStyle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.itemPriceStyle}>+ 5.000 đ</Text>
      </View>
      {renderSelectType()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 64,
    backgroundColor: '#fff',
    ...AppStyles.styles.shadow,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  imageStyle: { flex: 0, resizeMode: 'center', width: 50, height: '100%' },

  textContentStyle: {
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },

  textStyle: {
    ...AppStyles.fonts.medium,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: AppStyles.colors.text,
    fontSize: 16,
  },

  itemPriceStyle: {
    ...AppStyles.fonts.textBold,
    color: AppStyles.colors.accent,
  },

  arrowStyle: { height: '100%', width: 30, resizeMode: 'center' },

  multilineSelectContent: {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center',
  },

  mulInputStyle: {
    height: 35,
    width: 65,
    borderColor: AppStyles.colors.accent,
  },
});
