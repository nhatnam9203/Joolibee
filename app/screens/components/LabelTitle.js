import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppStyles } from '@theme';

export const LabelTitle = ({ label ,style}) =>
  label ? <Text style={[styles.txtStyle,style]}>{label.toUpperCase()}</Text> : [];

const styles = StyleSheet.create({
  txtStyle: {
    ...AppStyles.fonts.title,
    fontWeight: 'bold',
    marginVertical: 20,
  
  },
});
