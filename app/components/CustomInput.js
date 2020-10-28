import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const CustomInput = ({
  children,
  style,
  inputStyle = {},
  border,
  ...inputProps
}) => {
  return (
    <View style={[styles.container, style, border && styles.boder]}>
      <TextInput
        style={[styles.inputStyle, inputStyle]}
        placeholderTextColor="#9E9E9E"
        autoCapitalize="none"
        underlineColorAndroid="transparent"
        {...inputProps}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 54,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },

  inputStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'left',
    padding: 0,
    height: 48,
    paddingLeft: 6,
    color: '#484848',
    flex: 1,
  },

  boder: { borderWidth: 1, borderColor: '#BCBCBC' },
});

export default CustomInput;
