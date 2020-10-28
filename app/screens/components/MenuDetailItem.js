import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AppStyles, images } from '@theme';
import { CustomCheckBox, CustomInput } from '@components';
import { JollibeeImage } from './JollibeeImage';
import { destructuring } from '@utils';

export const MenuDetailItemSelectType = {
  Radio: 'radio',
  Multiline: 'checkbox',
  None: 'none',
};

export const MenuDetailItem = ({
  item,
  onPress,
  type = MenuDetailItemSelectType.Multiline,
  selected = false,
}) => {
  const [radioChecked, setRadioChecked] = React.useState(selected);

  const selectItem = (select) => {
    setRadioChecked(select);
  };

  React.useEffect(() => {
    setRadioChecked(selected);
  }, [selected]);

  const onPressItem = () => {
    if (typeof onPress === 'function') {
      onPress(item);
    } else {
      selectItem((prev) => !prev);
    }
  };

  const renderSelectType = () => {
    switch (type) {
      case MenuDetailItemSelectType.Multiline:
        return (
          <View style={styles.multilineSelectContent}>
            {item.can_change_quantity && (
              <CustomInput
                style={styles.mulInputStyle}
                inputStyle={styles.inputStyle}
                keyboardType="numeric"
                allowFontScaling={true}
                numberOfLines={1}
                defaultValue={item.quantity}
                multiline={false}
                clearTextOnFocus={true}
                maxLength={3}
              />
            )}
            <CustomCheckBox
              normalColor={AppStyles.colors.accent}
              selectedColor={AppStyles.colors.accent}
            />
          </View>
        );
      case MenuDetailItemSelectType.None:
        return null;
      case MenuDetailItemSelectType.Radio:
      default:
        return (
          <Image
            style={styles.arrowStyle}
            source={
              radioChecked
                ? images.icons.ic_radio_active
                : images.icons.ic_radio_inactive
            }
          />
        );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPressItem}
      activeOpacity={0.8}
      key={item.id}>
      <JollibeeImage
        style={styles.imageStyle}
        url={item?.product?.image?.url}
        width={50}
        height="100%"
      />
      <View style={styles.textContentStyle}>
        <Text style={styles.textStyle} numberOfLines={2} ellipsizeMode="tail">
          {item.label}
        </Text>
        {!!item?.price && (
          <Text style={styles.itemPriceStyle}>{`+ ${item.price}`}</Text>
        )}
      </View>
      {renderSelectType()}
    </TouchableOpacity>
  );
};

export const MenuOptionSelectedItem = React.memo(({ item }) => {
  return (
    <View style={styles.selectedContainer}>
      <JollibeeImage
        style={styles.imageSelectedStyle}
        url={destructuring.imageURLOfItem(item)}
        height="100%"
        width={30}
      />
      <Text style={styles.textSelectedStyle}>{'x' + item.quantity}</Text>
    </View>
  );
});

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

  imageStyle: {
    resizeMode: 'center',
    flex: 1,
  },

  imageSelectedStyle: {
    resizeMode: 'center',
    flex: 1,
    backgroundColor: '#fff',
    marginRight: 5,
  },

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
    color: AppStyles.colors.text,
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
    textAlignVertical: 'center',
  },

  textSelectedStyle: {
    ...AppStyles.fonts.bold,
    color: AppStyles.colors.button,
    fontSize: 16,
  },

  itemPriceStyle: {
    ...AppStyles.fonts.bold,
    color: AppStyles.colors.accent,
    flex: 0,
    marginLeft: 5,
  },

  arrowStyle: { height: '100%', width: 30, resizeMode: 'center' },

  multilineSelectContent: {
    flexDirection: 'row',
    flex: 0,
    alignItems: 'center',
  },

  mulInputStyle: {
    height: 30,
    width: 55,
    borderColor: AppStyles.colors.accent,
    justifyContent: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },

  inputStyle: {
    paddingLeft: 0,
    margin: 0,
    fontSize: 14,
    height: '100%',
    textAlign: 'center',
  },

  selectedContainer: {
    height: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    borderRadius: 30,
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
});
