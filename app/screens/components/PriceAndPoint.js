import React from 'react';
import { AppStyles } from '@theme';
import { View, Text, StyleSheet } from 'react-native';
import { format, scale } from '@utils';
import { translate } from '@localize';

const { scaleWidth, scaleHeight } = scale;

export const PriceAndPoint = ({ point, prices }) => {
  return (
    <View style={styles.priceContent}>
      {prices?.price && (
        <Text style={styles.priceStyle}>
          {format.jollibeeCurrency(prices?.price)}
        </Text>
      )}
      <Text style={styles.pointStyle}>
        + {`${point} ${translate('txtPoint')}`}{' '}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  priceStyle: {
    ...AppStyles.fonts.title,
    color: AppStyles.colors.accent,
    fontSize: scaleWidth(18),
  },

  pointStyle: {
    ...AppStyles.fonts.medium,
    fontSize: scaleWidth(12),
    color: '#484848',
  },

  priceContent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 0,
  },
});
