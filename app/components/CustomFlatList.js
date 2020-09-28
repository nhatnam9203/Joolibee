import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

const CustomFlatList = ({ ...props }) => {
  return <FlatList {...props} containerStyle={styles.containerStyle}   />;
};

const styles = StyleSheet.create({
  containerStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
export default CustomFlatList;
