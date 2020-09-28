import { CustomInput } from '@components';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ButtonCC, LabelTitle } from '../../components';

export const InputPhoneNumber = ({ next }) => {
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
});
