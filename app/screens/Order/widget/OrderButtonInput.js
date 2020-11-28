import { AppStyles, images } from '@theme';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ButtonCC,
  LabelTitle,
  PopupNoticeEnvironment,
  PopupOrderSuccess,
  OrderNewItem,
} from '../../components';
import React from 'react';
import { format, scale } from '@utils';

const { scaleWidth, scaleHeight } = scale;

export const OrderButtonInput = ({
  children,
  onPress,
  title,
  icon,
  bgColor,
  btnWidth,
  width = '100%',
  height = 52,
  borderColor = AppStyles.colors.placeholder,
  style,
  disabled,
}) => {
  return (
    <View
      style={[
        styles.buttonInputContainer,
        {
          height: scaleHeight(height),
          width,
          borderColor,
        },
        style,
      ]}>
      {children}
      <TouchableOpacity
        style={[
          styles.rightBtnInput,
          {
            backgroundColor: bgColor,
            width: btnWidth,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        onPress={onPress}
        disabled={disabled}>
        {!!title && (
          <LabelTitle
            label={title}
            color={AppStyles.colors.white}
            fontSize={15}
          />
        )}
        {!!icon && <Image source={icon} />}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonInputContainer: {
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },

  rightBtnInput: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
