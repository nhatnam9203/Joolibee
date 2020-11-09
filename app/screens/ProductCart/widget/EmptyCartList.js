import { StyleSheet, View, Text } from 'react-native';
import { translate } from '@localize';
import React from 'react';
import { AppStyles } from '@theme';

export const EmptyCartList = ({ error }) => (
  <View style={styles.container}>
    <Text style={styles.labelSum}>
      {error ? error : translate('txtNotFoundProduct')}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 15,
    alignItems: 'center',
  },
  label: {
    ...AppStyles.fonts.text,
    fontSize: 16,
    color: '#1B1B1B',
  },
});
