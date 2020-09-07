import React from 'react';
import { Appbar } from 'react-native-paper';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  <Image style={styles.navLogo} source={source} />
);

export const Action = ({ source }) =>
  source ? (
    <TouchableOpacity>
      <View style={styles.action}>
        <Image source={source} style={styles.navIcon} />
      </View>
    </TouchableOpacity>
  ) : (
    <Appbar.Action style={styles.action} />
  );

export const Space = ({}) => <View style={styles.space} />;

const styles = StyleSheet.create({
  container: {},

  navLogo: { width: 50, height: '100%' },

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
    right: 0,
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
    flex: 1,
  },

  action: { height: '100%', width: 50 },
  navIcon: { flex: 1, resizeMode: 'center' },

  space: {
    width: 8,
    height: '100%',
  },
});
