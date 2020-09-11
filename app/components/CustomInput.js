import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

const CustomInput = ({
  onChangeText,
  handleBlur,
  value,
  placeholder = '...',
  inputProps = {},
  children,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        {...inputProps}
        style={styles.inputStyle}
        onChangeText={onChangeText}
        onBlur={handleBlur}
        value={value}
        placeholder={placeholder} //dummy@abc.com
        placeholderTextColor="#9E9E9E"
        autoCapitalize="none"
        underlineColorAndroid="transparent"
      />
      {children && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 58,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 6,
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
});

export default CustomInput;
