import { CustomInput } from '@components';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ButtonCC, LabelTitle } from '../../components';

export const InputPhoneNumber = ({ next }) => {
  return (
    <View style={[AppStyles.styles.redContainer, styles.container]}>
      <LabelTitle label={translate('txtInputPhoneNumber')} />
      <Text style={styles.textStyle}>
        {translate('txtForgotPasswordDescription')}
      </Text>
      <CustomInput
        placeholder={translate('txtInputPhoneNumberOrMail')}
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        autoFocus={true}
      />
      <ButtonCC.ButtonYellow
        onPress={next}
        label={translate('txtContinue')}
        style={styles.btnStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 50, paddingHorizontal: 10 },
  btnStyle: { marginTop: 50, width: '50%' },
  textStyle: {
    ...AppStyles.fonts.text,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
});
