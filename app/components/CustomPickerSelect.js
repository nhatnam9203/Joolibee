import * as React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import RNPickerSelect from 'react-native-picker-select'; //ref: https://github.com/lawnstarter/react-native-picker-select
import Icon from 'react-native-vector-icons/Entypo';

/**
 *
 * npm install react-native-picker-select
  # if you see a `Invariant Violation: requireNativeComponent "RNCPicker" was not found in the UIManager` error:
  # React Native users
    npm install @react-native-community/picker
    npx pod-install
  # Expo
    expo install @react-native-community/picker
 */

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
        Icon={() => {
          return <Icon name="chevron-thin-down" color="gray" size={18} />;
        }}
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
    height: 58,
    width: '100%',
    fontFamily: 'Roboto-Regular',
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
  iconContainer: {
    top: 10,
    right: 12,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const styles = StyleSheet.create({
  wrapperPicker: {
    width: '100%',
    height: 54,
    borderRadius: 8,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    margin: 10,
    overflow: 'hidden',
  },

  border: {
    borderWidth: 1,
    borderColor: '#BCBCBC',
  },
});

export default CustomPickerSelect;
