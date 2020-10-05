import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AppStyles } from '@theme';

export const MenuItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <Image style={styles.imageStyle} source={item.image} />
    <View style={styles.textContentStyle}>
      <Text style={styles.textStyle}>{`${item.title}`.toUpperCase()}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 5,
    height: 200,
    backgroundColor: '#fff',
    ...AppStyles.styles.shadow,
    borderRadius: 8,
    overflow: 'hidden',
  },
  imageStyle: { flex: 1, resizeMode: 'center' },
  textContentStyle: {
    height: 55,
    backgroundColor: AppStyles.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    ...AppStyles.fonts.bold,
  },
});
