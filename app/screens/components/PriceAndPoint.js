import React from 'react';
import { AppStyles } from '@theme';
import { translate } from '@localize';
import { View, Text, StyleSheet } from 'react-native';

export const PriceAndPoint = ({ price, point }) => (
  <View style={styles.priceContent}>
    <Text style={styles.priceStyle}>{price}</Text>
    <Text style={styles.pointStyle}>+ {`${point}`} điểm</Text>
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
