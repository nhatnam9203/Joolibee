import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CustomInput } from '@components';
import { images, AppStyles } from '@theme';

export const OrderCount = ({
  defaultValue = 0,
  increase,
  decrease,
  inputCustomStyle = {},
}) => {
  return (
    <View style={styles.orderContentStyle}>
      <TouchableOpacity onPress={decrease} style={styles.buttonOrderStyle}>
        <Image source={images.icons.ic_sub} />
      </TouchableOpacity>

      <CustomInput
        style={[styles.mulInputStyle, inputCustomStyle]}
        inputStyle={styles.inputStyle}
        keyboardType="numeric"
        allowFontScaling={true}
        numberOfLines={1}
        defaultValue={defaultValue}
        multiline={false}
        clearTextOnFocus={true}
        maxLength={3}
        editable={false}
      />

      <TouchableOpacity onPress={increase} style={styles.buttonOrderStyle}>
        <Image source={images.icons.ic_plus} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  orderContentStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 0,
  },

  buttonOrderStyle: {
    width: 32,
    height: 32,
    backgroundColor: AppStyles.colors.accent,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mulInputStyle: {
    height: 37,
    width: 60,
    borderColor: '#707070',
    borderWidth: 1,
    justifyContent: 'center',
  },

  inputStyle: {
    paddingLeft: 0,
    margin: 0,
    fontSize: 16,
    height: '100%',
    textAlign: 'center',
  },
});
