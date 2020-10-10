import * as React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CustomPickerSelect = ({
  style,
  onChangeItem = () => {},
  placeholder,
  border,
  ...props
}) => {
  return (
    <View style={[styles.wrapperPicker, style, border && styles.border]}>
      <RNPickerSelect
        style={pickerSelectStyles}
        placeholder={{
          label: placeholder || 'Select ...',
          value: null,
        }}
        {...props}
        //useNativeAndroidPickerStyle={false}
        onValueChange={onChangeItem}
      />
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#484848',
    paddingRight: 30, // to ensure the text is never behind the icon
    // backgroundColor: '#FFFFFF',
    borderRadius: 10,
    height: 58,
    fontFamily: 'Roboto-Regular',
    marginVertical: 10,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: '#484848',
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 58,
    fontFamily: 'Roboto-Regular',
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});

const styles = StyleSheet.create({
  wrapperPicker: {
    width: '100%',
    height: 54,
    // borderWidth: 1,
    // borderColor: '#BCBCBC',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 10,
    // paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    margin: 10,
  },

  border: {
    borderWidth: 1,
    borderColor: '#BCBCBC',
  },
});

export default CustomPickerSelect;
