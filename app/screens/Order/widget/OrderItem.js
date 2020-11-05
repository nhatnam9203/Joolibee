import { AppStyles, images } from '@theme';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { CustomButtonImage } from '@components';
import { format } from '@utils';
export const OrderItem = ({ item }) => {
  const { product = {}, quantity, prices } = item;
  const _price = format.jollibeeCurrency(prices.price);
  return (
    <View style={styles.content}>
      <View style={[AppStyles.styles.horizontalLayout, styles.subContent]}>
        <Text style={styles.titleStyle} numberOfLines={2} ellipsizeMode="tail">
          {product.name}
        </Text>
        <Text style={styles.amountStyle}>x {quantity}</Text>
        <Text style={styles.priceStyle}>{_price}</Text>
      </View>
      <View style={[AppStyles.styles.horizontalLayout, styles.subContent]}>
        <Text
          style={styles.descriptionStyle}
          numberOfLines={2}
          ellipsizeMode="tail">
          {product.meta_description}
        </Text>
        <CustomButtonImage image={images.icons.ic_edit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, padding: 10 },
  subContent: { marginVertical: 5 },
  titleStyle: {
    ...AppStyles.fonts.bold,
    fontSize: 14,
    color: AppStyles.colors.text,
    flex: 1,
  },

  amountStyle: {
    ...AppStyles.fonts.medium,
    color: AppStyles.colors.accent,
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppStyles.colors.accent,
    marginHorizontal: 10,
    flex: 0,
  },

  priceStyle: {
    flex: 0,
    ...AppStyles.fonts.bold,
    fontSize: 16,
    color: AppStyles.colors.text,
  },

  descriptionStyle: {
    ...AppStyles.fonts.regular,
    fontSize: 14,
    flex: 1,
  },
});
