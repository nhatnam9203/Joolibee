import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AppStyles } from '@theme';

const DEFAULT_HEIGHT = 154;

export const ItemImageRight = ({
  children,
  ID,
  image,
  onPress,
  imgStyle,
  style,
  contentStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={[styles.content, contentStyle]}>{children}</View>
      <Image style={[styles.imageStyle, imgStyle]} source={image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    backgroundColor: '#fff',
    ...AppStyles.styles.shadow,
    borderRadius: 8,
    overflow: 'hidden',
    height: DEFAULT_HEIGHT,
  },
  imageStyle: {
    width: DEFAULT_HEIGHT,
    height: DEFAULT_HEIGHT,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    flex: 0,
  },
  content: {
    position: 'absolute',
    right: DEFAULT_HEIGHT,
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
  },
});
