import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyles, metrics } from '@theme';
import { format } from '@utils';
import { translate } from '@localize';
export default function orderInfo({ info }) {
  const { firstname, lastname, telephone, region, shipping_method = '' } =
    info || {};
  const method_shipping = shipping_method?.includes('Nhận tại cửa hàng')
    ? translate('txtToReceive')
    : translate('txtDeliveredTo');
  return (
    <View style={styles.container}>
      <Text style={AppStyles.fonts.text}>{firstname + ' ' + lastname}</Text>
      <Text style={AppStyles.fonts.text}>{telephone}</Text>
      <Text style={[AppStyles.fonts.text, { fontWeight: 'bold' }]}>
        {method_shipping}:
        <Text
          numberOfLines={2}
          style={[AppStyles.fonts.text, { fontWeight: 'normal' }]}>
          {format.addressFull({ ...info, region: { label: region } })}
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 113,
    flex: 0,
    justifyContent: 'space-between',
    padding: metrics.padding + 5,
    borderRadius: 6,
    ...AppStyles.styles.shadow,
  },
});
