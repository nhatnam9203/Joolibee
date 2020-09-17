import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const CustomButton = ({
  onPress,
  width = 36,
  height = 36,
  bgColor,
  txtColor,
  label,
  children,
  absolute = false,
  style
}) => (
  <TouchableOpacity
    style={[
      styles.btnStyle,
      {
        width: width,
        height: height,
        borderRadius: height / 2,
        backgroundColor: bgColor,
      },
      absolute && styles.btnAbsoluteStyle,
      style,
    ]}
    onPress={onPress}>
    {children && children}
    {!!label && (
      <Text style={[styles.txtStyle, { color: txtColor }]}>{label}</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {},
  btnAbsoluteStyle: { position: 'absolute', top: 10, left: 10 },
  txtStyle: {},
});

export default CustomButton;
