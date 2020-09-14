import React from 'react';
import { StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const CustomCheckBox = ({
  normalColor = '#989898',
  selectedColor = '#3FB4C3',
}) => {
  return (
    <CheckBox
      style={styles.checkBoxStyle}
      boxType="square"
      tintColors={{ true: normalColor, false: normalColor }}
      tintColor={normalColor}
      onCheckColor={selectedColor}
      onTintColor={selectedColor}
      animationDuration={0.25}
    />
  );
};

const styles = StyleSheet.create({
  checkBoxStyle: {
    marginRight: 5,
    width: 23,
    height: 23,
  },
});

export default CustomCheckBox;
