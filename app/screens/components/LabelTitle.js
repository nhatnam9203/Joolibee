import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { AppStyles } from '@theme';

export const LabelTitle = ({ label }) =>
  label ? <Text style={styles.txtStyle}>{label.toUpperCase()}</Text> : [];

const styles = StyleSheet.create({
  txtStyle: {
    ...AppStyles.fonts.title,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'white',
  },
});
