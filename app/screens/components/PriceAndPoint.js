import React from 'react';
import { AppStyles } from '@theme';
import { translate } from '@localize';
import { View, Text, StyleSheet } from 'react-native';

export const PriceAndPoint = () => (
  <View style={styles.priceContent}>
    <Text style={styles.priceStyle}>270.000</Text>
    <Text style={styles.pointStyle}>(+ 13 điểm)</Text>
  </View>
);

const styles = StyleSheet.create({
  priceStyle: {
    ...AppStyles.fonts.title,
    color: AppStyles.colors.accent,
    fontSize: 21,
  },

  pointStyle: {
    ...AppStyles.fonts.medium,
    fontSize: 12,
    color: '#484848',
  },

  priceContent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 0,
  },
});
