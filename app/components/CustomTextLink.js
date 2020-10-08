import React from 'react';
import { StyleSheet, Text } from 'react-native';

const CustomTextLink = ({ label, style, onPress }) => {
  return (
    <Text style={[styles.txtLinkStyle, style]} onPress={onPress}>
      {!!label && label}
    </Text>
  );
};

const styles = StyleSheet.create({
  txtLinkStyle: {
    fontSize: 16,
    textDecorationLine: 'underline',
    lineHeight: 22,
    marginLeft: 5,
  },
});
export default CustomTextLink;
