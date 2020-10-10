import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CustomCheckBox = ({
  normalColor = '#989898',
  selectedColor = '#3FB4C3',
  fillColor,
  ...props
}) => {
  return (
    <CheckBox
      style={
        Platform.OS === 'ios' && [
          styles.checkBoxStyle,
          fillColor && { backgroundColor: normalColor },
        ]
      }
      boxType="square"
      tintColors={{ true: selectedColor, false: normalColor }}
      tintColor={normalColor}
      onCheckColor={selectedColor}
      onTintColor={normalColor}
      animationDuration={0.25}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  checkBoxStyle: {
    marginRight: 5,
    width: 19,
    height: 19,
  },
});

export default CustomCheckBox;
