import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AppStyles } from '@theme';
import { JollibeeImage } from './JollibeeImage';
import { scale } from '@utils';

const { scaleWidth, scaleHeight } = scale;

const DEFAULT_HEIGHT = scaleHeight(160);

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
    <TouchableOpacity style={[style, styles.container]} onPress={onPress}>
      <View
        style={[styles.background, shadow && AppStyles.styles.shadowStrong]}>
        {imgPosition === 'left' && renderImage()}
        <View style={[styles.content, contentStyle]}>{children}</View>
        {imgPosition === 'right' && renderImage()}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { padding: 5 },

  background: {
    backgroundColor: '#fff',
    ...AppStyles.styles.horizontalLayout,
    borderRadius: scaleHeight(14),
    flex: 0,
  },

  imageStyle: {
    flex: 0,
  },

  content: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    borderRadius: 14,
  },
});
