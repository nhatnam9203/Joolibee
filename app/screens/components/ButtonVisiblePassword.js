import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ButtonVisiblePassword = ({ onPress, visible }) => (
  <TouchableOpacity style={styles.btnStyle} onPress={onPress} activeOpacity={1}>
    <Icon
      name={visible ? 'ios-eye' : 'ios-eye-off'}
      color={'#9E9E9E'}
      size={16}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btnStyle: {},
});
