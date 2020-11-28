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

export const OrderSectionItem = ({ children, onPress, height = 66 }) => {
  return (
    <TouchableOpacity
      style={[
        styles.itemStyle,
        {
          minHeight: height,
        },
      ]}
      onPress={onPress}
      disabled={!onPress}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemStyle: {
    backgroundColor: '#fff',
    marginVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },
});
