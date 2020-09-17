import { AppStyles } from '@theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const TextInputErrorMessage = ({
  message,
  color = AppStyles.colors.accent,
  style,
}) => (
  <View style={[styles.content, style]}>
    {!!message && (
      <Text style={[styles.txtStyle, { color: color }]}>{'* ' + message}</Text>
    )}
  </View>
);

const styles = StyleSheet.create({
  txtStyle: {
    color: AppStyles.colors.accent,
    ...AppStyles.fonts.mini,
  },

  content: {
    flex: 0,
    marginHorizontal: 15,
    marginBottom: 10,
  },
});
