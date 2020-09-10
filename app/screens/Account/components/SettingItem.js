import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { images } from '@theme';

const SettingItem = ({ item }) => {
  const { icon, title, isArrow } = item;
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Image source={icon} resizeMode="contain" />
      </View>
      <View style={styles.content}>
        {!!title && <Text style={styles.nameStyle}>{title}</Text>}
      </View>
      {isArrow && (
        <Image style={styles.arrowStyle} source={images.icons.ic_arrow} />
      )}
    </View>
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  icon: {
    backgroundColor: '#E31837',
    height: 30,
    width: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
  },

  nameStyle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#1B1B1B',
    fontWeight: 'bold',
  },

  arrowStyle: { height: 15, width: 10 },
});

export default SettingItem;
