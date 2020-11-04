import React from 'react';
import { StyleSheet, View } from 'react-native';
import { metrics } from '@theme';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';

export default function AddressLoading() {
  return (
    <Placeholder
      Animation={Fade}
      style={styles.containerLoading}
      Left={() => <PlaceholderMedia style={styles.leftLoading} />}
      Right={() => <PlaceholderMedia style={styles.rightLoading} />}>
      <View style={styles.contentLoading}>
        <PlaceholderLine width={40} />
        <PlaceholderLine />
      </View>
    </Placeholder>
  );
}

const styles = StyleSheet.create({
  contentLoading: {
    paddingHorizontal: 15,
    justifyContent: 'space-between',
  },

  leftLoading: { width: 30, height: 30 },
  rightLoading: { width: 20, height: 20, marginTop: 10 },

  containerLoading: {
    backgroundColor: '#fff',
    height: 75,
    flex: 0,
    flexDirection: 'row',
    padding: metrics.padding + 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 6,
    width: '95%',
  },
});
