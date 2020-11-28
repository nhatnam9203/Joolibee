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

export const OrderVoucherItem = ({
  style,
  content,
  colorText = AppStyles.colors.moderate_cyan,
  icon = images.icons.ic_sticked,
}) => (
  <View style={[styles.voucherContainer, style]}>
    <Image style={styles.voucherIcon} source={icon} />
    <Text style={[styles.voucherText, { color: colorText }]}>{content}</Text>
  </View>
);

const styles = StyleSheet.create({
  voucherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  voucherIcon: {
    width: scaleWidth(17),
    height: scaleHeight(17),
    resizeMode: 'contain',
  },
  voucherText: {
    ...AppStyles.fonts.text,
    color: AppStyles.colors.moderate_cyan,
    marginLeft: 3,
    fontSize: scaleWidth(16),
  },
});
