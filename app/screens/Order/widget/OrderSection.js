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

export const OrderSection = ({
  titleColor = AppStyles.colors.accent,
  title,
  children,
  buttonComponent,
}) => {
  return (
    <View>
      <View style={[AppStyles.styles.horizontalLayout, { padding: 17 }]}>
        {!!title && (
          <LabelTitle label={title} color={titleColor} fontSize={18} />
        )}
        {buttonComponent && buttonComponent()}
      </View>
      <View>{children}</View>
    </View>
  );
};
