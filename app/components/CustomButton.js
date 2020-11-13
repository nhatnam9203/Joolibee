import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';

const DISABLE_COLOR = '#4448';

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
  borderWidth = 1,
  style,
  styleText,
  disabled,
  borderRadius = 12,
  styleContent = {},
  ...props
}) => (
  <TouchableOpacity
    style={[
      {
        width: width,
        height: height,
        borderRadius: borderRadius ?? height / 2,
        backgroundColor: bgColor,
        // ...(borderColor && { borderWidth: 1, borderColor: borderColor }),
      },
      absolute && styles.btnAbsoluteStyle,
      style,
    ]}
    activeOpacity={0.8}
    underlayColor={bgColor}
    onPress={onPress}
    disabled={disabled}
    {...props}>
    <>
      <View
        style={[
          styles.content,
          styleContent,
          {
            backgroundColor: bgColor,
            borderRadius: borderRadius ?? height / 2,
            ...(borderColor &&
              !disabled && {
                borderWidth: borderWidth,
                borderColor: borderColor,
              }),
          },
        ]}>
        {children}
        {!!label && (
          <Text style={[styles.txtStyle, { color: textColor }, styleText]}>
            {label?.toUpperCase()}
          </Text>
        )}
      </View>
      {disabled && (
        <View
          style={[
            styles.absolute,
            {
              borderRadius: borderRadius ?? height / 2,
              backgroundColor: DISABLE_COLOR,
            },
          ]}
        />
      )}
    </>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnAbsoluteStyle: { position: 'absolute', top: 10, left: 10 },
  txtStyle: { fontFamily: 'SVN-Merge', fontSize: 16, marginLeft: 5 },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default CustomButton;
