import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyles, metrics } from '@theme';
import { format } from '@utils';
export default function orderProductList({ data = [] }) {
  const renderItem = (item, index) => (
    <View key={index + ''} style={styles.container}>
      <View style={styles.leftContainer}>
        <Text style={[AppStyles.fonts.bold, styles.txtContent]}>
          {item.product_name}
        </Text>
        {/* <Text style={[AppStyles.fonts.text, styles.txtContent]}>
          {item.extra}
        </Text>
        <Text style={[AppStyles.fonts.text, styles.txtContent]}>
          {item.soft_drink}
        </Text> */}
      </View>

      <View style={styles.rightContainer}>
        <BlockQuantity qty={item.quantity_ordered} />
        <Text style={AppStyles.fonts.bold}>
          {format.jollibeeCurrency(item.product_sale_price)}
        </Text>
      </View>
    </View>
  );

  return data.map(renderItem);
}

const BlockQuantity = ({ qty }) => (
  <View style={styles.blockQuantity}>
    <Text style={styles.txtQty}>x{qty}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'space-between',
    paddingHorizontal: metrics.padding + 5,
    paddingVertical: metrics.padding + 15,
    marginBottom: 2,
    borderRadius: 6,
    ...AppStyles.styles.shadow,
  },
  rightContainer: {
    width: '41%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  leftContainer: {
    width: '56%',
  },

  txtContent: {
    fontSize: 14,
    marginTop: 5,
  },
  blockQuantity: {
    width: 30,
    height: 29,
    flex: 0,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: AppStyles.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtQty: {
    fontSize: 14,
    color: AppStyles.colors.accent,
    ...AppStyles.fonts.medium,
  },
});
