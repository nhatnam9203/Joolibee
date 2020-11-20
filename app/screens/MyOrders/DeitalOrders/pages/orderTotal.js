import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyles, metrics } from '@theme';

export default function orderTotal() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={AppStyles.fonts.text}>Tạm tính:</Text>
        <Text style={AppStyles.fonts.bold}>255.000 đ</Text>
      </View>

      <View style={styles.content}>
        <Text style={AppStyles.fonts.text}>Khuyến mãi (Ưu đãi 40.000đ)</Text>
        <Text style={AppStyles.fonts.bold}>-40.000 đ</Text>
      </View>

      <View style={styles.seperator} />

      <View style={styles.content}>
        <Text style={[AppStyles.fonts.bold, styles.txtFontSize]}>
          Tổng cộng:
        </Text>
        <Text style={[AppStyles.fonts.bold, styles.txtFontSize]}>
          215.000 đ
        </Text>
      </View>

      <PaymentMethod />
    </View>
  );
}

const PaymentMethod = () => (
  <View
    style={[styles.content, { justifyContent: 'flex-end', marginBottom: 50 }]}>
    <View style={styles.block}>
      <Text style={AppStyles.fonts.text}>đ</Text>
    </View>
    <Text style={AppStyles.fonts.text}>Tiền mặt</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 0,
    justifyContent: 'space-between',
    paddingVertical: metrics.padding + 5,
    borderRadius: 6,
    ...AppStyles.styles.shadow,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
    paddingHorizontal: metrics.padding + 5,
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: '#E1E1E1',
    marginTop: 30,
    marginBottom: 10,
  },

  txtFontSize: {
    fontSize: 18,
  },
  block: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#484848',
    marginRight: 10,
  },
});
