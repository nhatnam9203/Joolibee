import React from 'react';
import { AppStyles } from '@theme';
import { View, Text, StyleSheet } from 'react-native';
import { destructuring, format } from '@utils';

export const PriceAndPoint = ({ price_range, point }) => {
  const { sellPrice } = destructuring.priceOfRange(price_range);
  return (
    <View style={styles.priceContent}>
      <Text style={styles.priceStyle}>
        {format.jollibeeCurrency(sellPrice)}
      </Text>
      <Text style={styles.pointStyle}>+ {`${point}`} điểm</Text>
    </View>
  );
};

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
