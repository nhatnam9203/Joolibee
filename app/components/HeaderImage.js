import React from 'react';
import { Image, StyleSheet } from 'react-native';

const HeaderImage = ({ src }) => {
  return <Image source={src} style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    tintColor: '#fff',
    width: 45,
    height: 45,
    margin: 10,
    resizeMode: 'center',
  },
});

export default HeaderImage;
