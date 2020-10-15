import { AppStyles, images } from '@theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import { JollibeeImage } from './JollibeeImage';

export const MenuItemLoading = () => (
  <Placeholder style={styles.container} Animation={Fade}>
    <PlaceholderMedia style={styles.placeholderMedia} />
    <PlaceholderLine style={styles.textContentStyle} />
  </Placeholder>
);

export const MenuItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <JollibeeImage
      style={styles.imageStyle}
      url={item.thumbnail_image}
      defaultSource={images.menu_3}
    />
    <View style={styles.textContentStyle}>
      <Text style={styles.textStyle}>{`${item.name}`.toUpperCase()}</Text>
    </View>
  </TouchableOpacity>
);

const HEIGHT = 200;
const TEXT_HEIGHT = 45;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: 5,
    height: HEIGHT,
    backgroundColor: '#fff',
    ...AppStyles.styles.shadow,
    borderRadius: 8,
    overflow: 'hidden',
  },

  imageStyle: {
    flex: 1,
    resizeMode: 'center',
  },

  textContentStyle: {
    height: TEXT_HEIGHT,
    backgroundColor: AppStyles.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },

  textStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    ...AppStyles.fonts.bold,
  },

  placeholderMedia: {
    width: '100%',
    height: HEIGHT - TEXT_HEIGHT,
    backgroundColor: '#fff',
  },
});
