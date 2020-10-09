import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';

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
  style,
  styleText,
  disabled,
  ...props
}) => (
  <TouchableHighlight
    style={[
      {
        width: width,
        height: height,
        borderRadius: height / 2,
        backgroundColor: bgColor,
        // ...(borderColor && { borderWidth: 1, borderColor: borderColor }),
      },
      absolute && styles.btnAbsoluteStyle,
      style,
    ]}
    activeOpacity={0.2}
    underlayColor={bgColor}
    onPress={onPress}
    disabled={disabled}
    {...props}>
    <>
      <View
        style={[
          styles.content,
          {
            backgroundColor: bgColor,
            borderRadius: height / 2,
            ...(borderColor &&
              !disabled && { borderWidth: 1, borderColor: borderColor }),
          },
        ]}>
        {children && children}
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
              borderRadius: height / 2,
              backgroundColor: DISABLE_COLOR,
            },
          ]}
        />
      )}
    </>
  </TouchableHighlight>
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
