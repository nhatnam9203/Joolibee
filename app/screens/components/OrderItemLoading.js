import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';

export const OrderItemLoading = () => {
  return (
    <Placeholder
      Animation={Fade}
      style={styles.container}
      Left={() => <PlaceholderMedia style={{ width: 49, height: 49 }} />}
      Right={() => <View style={styles.left}>
        <PlaceholderLine width={100} />
        <PlaceholderLine width={70} />

        <View style={styles.rightBottomContainer}>
          <PlaceholderMedia style={{ borderRadius: 20, marginHorizontal: 5 }} />
          <PlaceholderMedia style={{ borderRadius: 20 }} />
        </View>

      </View>}

    >
      <View style={styles.bottomCenterContainer}>
        <PlaceholderLine height={15} width={70} />
        <PlaceholderLine width={40} />
        <PlaceholderLine width={85} />

        <View style={{ flexDirection: 'row' }}>
          <PlaceholderMedia />
          <PlaceholderMedia style={{ width: 60, marginHorizontal: 10 }} />
          <PlaceholderMedia />

        </View>

      </View>

    </Placeholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  left: {
    width: 60,
    alignItems: 'flex-end'
  },
  rightBottomContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  bottomCenterContainer: {
    flex: 1,
    paddingLeft: 10
  }
});
