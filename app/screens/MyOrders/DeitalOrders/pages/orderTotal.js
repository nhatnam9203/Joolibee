import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { AppStyles, metrics, images } from '@theme';
import { format, scale } from '@utils';
import { translate } from '@localize';

const { scaleWidth, scaleHeight } = scale;

export default function orderTotal({ total, voucher_discount_amount }) {
  const { grand_total, subtotal } = total || {};
  const discount_total = '0.000đ';
  // Logger.debug(total, '======> total');
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={AppStyles.fonts.text}>
          {translate('txtOrderCalculator')}:
        </Text>
        <Text style={AppStyles.fonts.bold}>
          {subtotal && format.jollibeeCurrency(subtotal)}
        </Text>
      </View>

      {voucher_discount_amount && (
        <View style={styles.content}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={styles.voucherIcon}
              source={images.icons.ic_sticked}
            />
            <Text
              style={
                AppStyles.fonts.text
              }>{`Khuyến mãi (Ưu đãi ${voucher_discount_amount} đ)`}</Text>
          </View>
          <Text
            style={
              AppStyles.fonts.bold
            }>{`- ${voucher_discount_amount} đ`}</Text>
        </View>
      )}
      <View style={styles.seperator} />

      <View style={styles.content}>
        <Text style={[AppStyles.fonts.bold, styles.txtFontSize]}>
          {translate('txtGrandTotal')}:
        </Text>

        <Text style={[AppStyles.fonts.bold, styles.txtFontSize]}>
          {grand_total && format.jollibeeCurrency(grand_total)}
        </Text>
      </View>

      <PaymentMethod />
    </View>
  );
}

const PaymentMethod = () => (
  <View
    style={[styles.content, { justifyContent: 'flex-end', marginBottom: 30 }]}>
    <View style={styles.block}>
      <Text style={AppStyles.fonts.text}>đ</Text>
    </View>
    <Text style={AppStyles.fonts.text}>{translate('txtPaymentMoney')}</Text>
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

  voucherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  voucherIcon: {
    width: scaleWidth(17),
    height: scaleHeight(17),
    resizeMode: 'contain',
  },
  voucherText: {
    ...AppStyles.fonts.text,
    color: AppStyles.colors.moderate_cyan,
    marginLeft: 3,
    fontSize: scaleWidth(16),
  },
});
