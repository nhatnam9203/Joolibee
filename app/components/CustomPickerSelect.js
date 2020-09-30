import * as React from 'react';
import { StyleSheet, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const CustomPickerSelect = ({
  style,
  onChangeItem = () => {},
  placeholder,
  ...props
}) => {
  return (
    <RNPickerSelect
      style={pickerSelectStyles}
      placeholder={{
        label: placeholder || 'Select ...',
        value: null,
      }}
      {...props}
      useNativeAndroidPickerStyle={false}
      onValueChange={onChangeItem}
    />
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#484848',
    paddingRight: 30, // to ensure the text is never behind the icon
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 6,
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
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 6,
    height: 58,
    fontFamily: 'Roboto-Regular',
    marginVertical: 10,
  },
  placeholder: {
    color: '#9E9E9E',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    height: 58,
    backgroundColor: 'red',
  },

  containerStyle: {
    height: 52,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BCBCBC',
    borderRadius: 6,
    margin: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  itemStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 10,
  },

  dropDownStyle: { backgroundColor: '#FFFFFF' },

  arrowStyle: { color: '#959595' },

  labelStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 0,
    color: '#9E9E9E',
    flex: 1,
  },

  selectedLabelStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 0,
    color: '#484848',
    flex: 1,
  },

  activeLabelStyle: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 0,
    color: '#484848',
    flex: 1,
  },

  placeholderStyle: {
    color: '#9E9E9E',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'left',
    textAlignVertical: 'center',
    padding: 0,
    flex: 1,
  },
});

export default CustomPickerSelect;
