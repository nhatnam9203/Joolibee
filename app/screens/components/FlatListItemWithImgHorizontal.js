import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AppStyles, images } from '@theme';
import { JollibeeImage } from './JollibeeImage';
import { scale } from '@utils';
import FastImage from 'react-native-fast-image';

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
  hotIcon = true,
}) => {
  const renderImage = () => (
    <JollibeeImage url={image} width={imgWidth} height={imgHeight} />
  );

  return (
    <TouchableOpacity style={[style, styles.container]} onPress={onPress}>
      <View
        style={[styles.background, shadow && AppStyles.styles.shadowStrong]}>
        {imgPosition === 'left' && renderImage()}
        {hotIcon && (
          <Image
            style={styles.hotIcon}
            source={images.icons.ic_hot}
            resizeMode="center"
          />
        )}
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
    overflow: 'hidden',
  },

  content: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    borderRadius: 14,
  },

  hotIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});
