import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AppStyles } from '@theme';
import { LabelTitle, ButtonCC } from '../../components';
import { CustomInput } from '@components';
import { translate } from '@localize';

export const InputPhoneNumber = () => {
  return (
    <View style={[AppStyles.styles.redContainer, styles.container]}>
      <LabelTitle label={translate('txtInputPhoneNumber')} />
      <CustomInput
        placeholder={translate('txtInputPhoneNumber')}
        textContentType="telephoneNumber"
        keyboardType="phone-pad"
        autoFocus={true}
      />
      <ButtonCC.ButtonYellow
        label={translate('txtContinue')}
        style={styles.btnStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 50, paddingHorizontal: 10 },
  btnStyle: { marginTop: 50, width: '50%' },
});
