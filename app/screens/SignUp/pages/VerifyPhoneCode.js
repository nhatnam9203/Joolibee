import { CustomInput, CustomTextLink } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { ButtonCC, LabelTitle } from '../../components';

export const VerifyPhoneCode = ({ phone = '0975783565', next }) => {
  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.accent}>
      <Animated.View style={styles.container}>
        <LabelTitle label={translate('txtPhoneCode')} />
        <Text style={styles.textStyle}>
          {translate('txtInputPhoneDesc1') +
            phone +
            translate('txtInputPhoneDesc2')}
        </Text>
        <CustomInput
          placeholder={translate('txtPhoneCode')}
          autoFocus={true}
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        />
        <ButtonCC.ButtonYellow
          label={translate('txtContinue')}
          style={styles.btnStyle}
          onPress={next}
        />
        <View style={styles.resendCodeStyle}>
          <Text style={styles.textStyle}>
            {translate('txtNotReceivedCode')}
          </Text>

          <CustomTextLink
            label={translate('txtResend')}
            style={styles.textBoldStyle}
            onPress={next}
          />
        </View>
      </Animated.View>
    </SinglePageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  btnStyle: { marginTop: 50, width: '50%' },
  textStyle: {
    ...AppStyles.fonts.text,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  textBoldStyle: {
    ...AppStyles.fonts.text,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  resendCodeStyle: {
    flexDirection: 'row',
    height: 50,
    marginVertical: 50,
  },
});
