import * as React from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DROP_DOWN_MAX_HEIGHT = 300;

const CustomPickerSelect = ({ style, ...props }) => {
  return (
    <DropDownPicker
      containerStyle={[styles.containerStyle, style]}
      style={styles.container}
      itemStyle={styles.itemStyle}
      dropDownStyle={styles.dropDownStyle}
      arrowSize={26}
      arrowColor="#757575"
      dropDownMaxHeight={DROP_DOWN_MAX_HEIGHT}
      labelStyle={styles.labelStyle}
      selectedLabelStyle={styles.selectedLabelStyle}
      activeLabelStyle={styles.activeLabelStyle}
      placeholderStyle={styles.placeholderStyle}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
  },

  containerStyle: {
    height: 58,
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
