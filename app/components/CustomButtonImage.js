import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';

const CustomButtonImage = ({ image, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
    <Image source={image} />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 0 },
});

export default CustomButtonImage;
