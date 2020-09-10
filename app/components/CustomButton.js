import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const CustomButton = ({
  onPress,
  width = 36,
  height = 36,
  bgColor,
  textColor,
  label,
  children,
  absolute = false,
  borderColor,
}) => (
  <TouchableOpacity
    style={[
      styles.btnStyle,
      {
        width: width,
        height: height,
        borderRadius: height / 2,
        backgroundColor: bgColor,
        ...(borderColor && { borderWidth: 2, borderColor: borderColor }),
      },
      absolute && styles.btnAbsoluteStyle,
    ]}
    onPress={onPress}>
    {children && children}
    {!!label && (
      <Text style={[styles.txtStyle, { color: textColor }]}>
        {label?.toUpperCase()}
      </Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: { justifyContent: 'center', alignItems: 'center' },
  btnAbsoluteStyle: { position: 'absolute', top: 10, left: 10 },
  txtStyle: { fontFamily: 'SVN-Merge', fontSize: 16 },
});

export default CustomButton;
