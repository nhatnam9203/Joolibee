import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

const CustomFlatList = ({ onRefresh, refreshing, ...props }) => {
  return (
    <FlatList
      {...props}
      containerStyle={styles.containerStyle}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});
export default CustomFlatList;
