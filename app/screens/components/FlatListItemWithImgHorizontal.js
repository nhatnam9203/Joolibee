import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AppStyles } from '@theme';

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
    <Image
      style={[
        styles.imageStyle,
        imgStyle,
        { width: imgWidth, height: imgHeight },
      ]}
      source={image}
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
    margin: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    ...AppStyles.styles.horizontalLayout,
    overflow: 'hidden',
    flex: 0,
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
