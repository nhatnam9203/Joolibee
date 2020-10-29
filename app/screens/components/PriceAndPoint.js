import React from 'react';
import { AppStyles } from '@theme';
import { translate } from '@localize';
import { View, Text, StyleSheet } from 'react-native';
import { format, scale } from "@utils";

export const PriceAndPoint = ({ price_range, point }) => {
  const { minimum_price } = price_range || {};
  const _price = format.jollibeeCurrency(minimum_price?.final_price);
  return (
    <View style={styles.priceContent}>
      <Text style={styles.priceStyle}>{_price}</Text>
      <Text style={styles.pointStyle}>+ {`${point}`} điểm</Text>
    </View>
  )
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
