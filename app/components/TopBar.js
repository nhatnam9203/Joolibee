import React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';

export const Bar = ({ leftComponents, rightComponents, children, style }) => {
  return (
    <Appbar.Header style={[styles.container, style]}>
      {leftComponents && <View style={styles.leftPanel}>{leftComponents}</View>}
      {rightComponents && (
        <View style={styles.rightPanel}>{rightComponents}</View>
      )}
      {children && <View style={styles.midPanel}>{children}</View>}
    </Appbar.Header>
  );
};

export const Logo = ({ source }) => (
  <Image style={styles.logoStyle} source={source} />
);

export const Action = ({ source, onPress }) =>
  source ? (
    <TouchableOpacity onPress={onPress} style={styles.actionStyle}>
      <Image source={source} style={styles.iconStyle} />
    </TouchableOpacity>
  ) : (
    <Appbar.actionStyle style={styles.actionStyle} onPress={onPress} />
  );

export const Space = ({}) => <View style={styles.space} />;

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },

  logoStyle: { width: 50, height: '100%' },

  leftPanel: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  rightPanel: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  midPanel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },

  actionStyle: {
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconStyle: { flex: 1, resizeMode: 'center' },

  space: {
    width: 8,
    height: '100%',
  },
});
