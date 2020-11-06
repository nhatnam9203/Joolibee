import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AppStyles } from '@theme';
import { JollibeeImage } from './JollibeeImage';

const DEFAULT_HEIGHT = 154;

export const FlatListItemWithImgHorizontal = ({
  children,
  ID,
  image,
  onPress,
  imgStyle,
  style,
  contentStyle,
  imgPosition = 'right',
  imgHeight = DEFAULT_HEIGHT,
  imgWidth = DEFAULT_HEIGHT,
  shadow = true,
}) => {
  const renderImage = () => (
    <JollibeeImage
      style={[
        styles.imageStyle,
        imgStyle,
        { width: imgWidth, height: imgHeight },
      ]}
      url={image}
    />
  );

  return (
    <TouchableOpacity
      style={[styles.container, style, shadow && AppStyles.styles.shadow]}
      onPress={onPress}>
      {imgPosition === 'left' && renderImage()}
      <View style={[styles.content, contentStyle]}>{children}</View>
      {imgPosition === 'right' && renderImage()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    // backgroundColor: '#fff',
    ...AppStyles.styles.horizontalLayout,
    overflow: 'hidden',
    flex: 0,
    padding: 5,
  },

  imageStyle: {
    flex: 0,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 5,
    flex: 1,
  },
});
