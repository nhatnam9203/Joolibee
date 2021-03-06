import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { CustomCheckBox } from '@components';
import { AppStyles } from '@theme';

export const TextCheckBox = ({
  label,
  value,
  onValueChange,
  style,
  normalColor,
  selectedColor,
  fillColor,
  tintColor,
  onCheckColor,
  onTintColor,
  disabled,
}) => (
  <View style={[styles.container, style]}>
    <CustomCheckBox
      normalColor={normalColor}
      selectedColor={selectedColor}
      value={value}
      onValueChange={onValueChange}
      fillColor={fillColor}
      tintColor={tintColor}
      onTintColor={onTintColor}
      onCheckColor={onCheckColor}
      disabled={disabled}
    />
    <Text style={[styles.txtStyle, { color: normalColor }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  txtStyle: {
    ...AppStyles.fonts.text,
    marginLeft: 5,
  },
});
