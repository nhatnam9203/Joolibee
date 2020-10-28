import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CustomInput } from '@components';
import { images, AppStyles } from '@theme';

export const OrderCount = ({ defaultValue = 0 }) => {
  return (
    <View style={styles.orderContentStyle}>
      <TouchableOpacity style={styles.buttonOrderStyle}>
        <Image source={images.icons.ic_sub} />
      </TouchableOpacity>
      <CustomInput
        style={styles.mulInputStyle}
        inputStyle={styles.inputStyle}
        keyboardType="numeric"
        allowFontScaling={true}
        numberOfLines={1}
        defaultValue={defaultValue}
        multiline={false}
        clearTextOnFocus={true}
        maxLength={3}
      />
      <TouchableOpacity style={styles.buttonOrderStyle}>
        <Image source={images.icons.ic_plus} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  orderContentStyle: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },

  buttonOrderStyle: {
    width: 30,
    height: 30,
    backgroundColor: AppStyles.colors.accent,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mulInputStyle: {
    height: 35,
    width: 60,
    borderColor: '#707070',
    justifyContent: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },

  inputStyle: {
    paddingLeft: 0,
    margin: 0,
    fontSize: 16,
    height: '100%',
    textAlign: 'center',
  },
});
