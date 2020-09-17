import React from 'react';
import { StyleSheet, TouchableHighlight, Text, View } from 'react-native';

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
  ...props
}) => (
  <TouchableHighlight
    style={[
      {
        width: width,
        height: height,
        borderRadius: height / 2,
        ...(borderColor && { borderWidth: 2, borderColor: borderColor }),
      },
      absolute && styles.btnAbsoluteStyle,
      style,
    ]}
    activeOpacity={0.2}
    underlayColor={bgColor}
    onPress={onPress}
    {...props}>
    <View
      style={[
        styles.content,
        {
          backgroundColor: bgColor,
          borderRadius: height / 2,
          ...(borderColor && { borderWidth: 2, borderColor: borderColor }),
        },
      ]}>
      {children && children}
      {!!label && (
        <Text style={[styles.txtStyle, { color: textColor }]}>
          {label?.toUpperCase()}
        </Text>
      )}
    </View>
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
});

export default CustomButton;
