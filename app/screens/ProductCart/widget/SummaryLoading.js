import { Placeholder, PlaceholderLine, Fade } from 'rn-placeholder';
import { StyleSheet, View } from 'react-native';
import React from 'react';

export const SummaryLoading = () => (
  <Placeholder Animation={Fade} style={styles.container}>
    <View style={styles.containerLoading}>
      <PlaceholderLine width={90} />
      <PlaceholderLine width={50} />
    </View>
  </Placeholder>
);

const styles = StyleSheet.create({
  container: { width: 100 },
});
