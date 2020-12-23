import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { images, metrics } from '@theme';

export const SettingItem = ({ item, onPress = () => {}, buttonComponent }) => {
  const { icon, title, isArrow } = item  || {};
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon && (
        <View style={styles.icon}>
          <Image source={icon} resizeMode="contain" />
        </View>
      )}
      <View style={styles.content}>
        {!!title && <Text style={styles.nameStyle}>{title}</Text>}
      </View>

      {buttonComponent && buttonComponent()}

      {isArrow && (
        <Image style={styles.arrowStyle} source={images.icons.ic_arrow} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 63,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: metrics.padding,
  },

  icon: {
    backgroundColor: '#E31837',
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    margin: metrics.margin,
  },

  content: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: metrics.margin,
  },

  nameStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#1B1B1B',
  },

  arrowStyle: { height: 15, width: 10, margin: metrics.margin },
});
