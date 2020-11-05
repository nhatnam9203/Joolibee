import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppStyles, metrics } from '@theme';

export default function orderInfo() {
  return (
    <View style={styles.container}>
      <Text style={AppStyles.fonts.text}>Nguyen Van A</Text>
      <Text style={AppStyles.fonts.text}>0778123456</Text>
      <Text style={[AppStyles.fonts.text, { fontWeight: 'bold' }]}>
        Giao đến:
        <Text
          numberOfLines={2}
          style={[AppStyles.fonts.text, { fontWeight: 'normal' }]}>
          16 Trương Định, P. 6, Q. 3, Tp. HCM
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
