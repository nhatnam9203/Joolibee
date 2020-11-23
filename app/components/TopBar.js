import React from 'react';
import { Appbar, Badge } from 'react-native-paper';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { scale } from '@utils';

const BADGE_SIZE = scale.scaleHeight(20);

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

export const Avatar = ({ source, size }) => (
  <View
    style={[
      styles.avatar,
      { width: size, height: size, borderRadius: size / 2 },
    ]}>
    <Image style={styles.avatarImg} source={source} />
  </View>
);

export const Action = ({
  source,
  onPress,
  notifyNumber,
  bagSize,
  bagStyle,
  children,
}) =>
  source || children ? (
    <TouchableOpacity onPress={onPress} style={styles.actionStyle}>
      <View style={styles.actionContent}>
        {children ?? <Image source={source} style={styles.iconStyle} />}
        {notifyNumber > 0 && (
          <Badge
            size={bagSize ?? BADGE_SIZE}
            style={[styles.badgeStyle, bagStyle]}>
            {notifyNumber}
          </Badge>
        )}
      </View>
    </TouchableOpacity>
  ) : (
    <Appbar.Action style={styles.actionStyle} onPress={onPress} />
  );

export const Space = () => <View style={styles.space} />;

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center' },

  logoStyle: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'center',
  },

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
    width: scale.scaleWidth(50),
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconStyle: { resizeMode: 'center' },

  space: {
    width: 8,
    height: '100%',
  },

  badgeStyle: {
    backgroundColor: '#FFC522',
    position: 'absolute',
    top: -scale.scaleHeight(5),
    right: -scale.scaleHeight(5),
    fontFamily: 'Roboto-Bold',
    fontWeight: 'bold',
    fontSize: scale.scaleHeight(14),
  },

  avatar: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
  },

  avatarImg: {
    width: '86%',
    resizeMode: 'contain',
  },

  actionContent: {
    height: scale.scaleHeight(40),
    width: scale.scaleHeight(45),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
