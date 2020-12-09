import { CustomInput, CustomTextLink } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import { format, validate } from '@utils';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { ButtonCC, LabelTitle, TextInputErrorMessage } from '../../components';
const LAYOUT_WIDTH = '90%';

export const VerifyPhoneCode = ({
  infos,
  resendCode,
  confirmCode,
  timeOut,
}) => {
  const { phone = undefined, error } = infos;
  var interval;
  const dispatch = useDispatch();
  // time count down
  const [timer, setSecond] = React.useState(timeOut);
  // start count down
  const [timing, setTiming] = React.useState(false);
  const [codeInput, setCodeInput] = React.useState(null);

  const verifyCode = () => {
    if (validate.isEmptyString(codeInput)) {
      return;
    }

    confirmCode(codeInput, phone);
  };

  // Request firebase send code to phone,
  const resendCodeRequest = () => {
    if (typeof resendCode === 'function') {
      resendCode({ phone });
      setTiming(true);
    }
  };

  const convertMaskPhoneNumber = () => {
    let start_phone = phone?.substring(0, 4);
    let end_phone = phone?.substring(phone?.length, phone?.length - 2);
    return start_phone + '****' + end_phone;
  };

  React.useEffect(() => {
    setTiming(true);
  }, []);

  React.useEffect(() => {
    if (timing) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      interval = setInterval(() => {
        setSecond((preSecond) => {
          if (preSecond <= 1) {
            setTiming(false);
            clearInterval(interval);
            return timeOut;
          } else {
            return preSecond - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timing]);

  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.accent}>
      <Animated.View style={styles.container}>
        <LabelTitle label={translate('txtPhoneCode')} color="#fff" />
        <Text style={styles.textStyle}>
          {translate('txtInputPhoneDesc1') +
            ' ' +
            convertMaskPhoneNumber() +
            translate('txtInputPhoneDesc2')}
        </Text>

        <CustomInput
          placeholder={translate('txtPhoneCode')}
          autoFocus={true}
          textContentType="oneTimeCode"
          keyboardType="numeric"
          returnKeyType="next"
          onChangeText={(txt) => setCodeInput(txt)}
          value={codeInput}
        />

        {error && (
          <TextInputErrorMessage
            style={{ width: LAYOUT_WIDTH }}
            message={error?.code}
            color={AppStyles.colors.inputError}
          />
        )}

        {timing && (
          <Text style={styles.textHighlightStyle}>
            {translate('txtVerifyCodeTime') +
              '\n (' +
              format.pad_(timer, 2) +
              ') ' +
              translate('txtSecondUnit')}
          </Text>
        )}

        <ButtonCC.ButtonYellow
          label={translate('txtContinue')}
          style={styles.btnStyle}
          onPress={verifyCode}
          disabled={!timing || validate.isEmptyString(codeInput)}
        />

        {/**resend code */}
        {!timing && (
          <View style={styles.resendCodeStyle}>
            <Text style={styles.textStyle}>
              {translate('txtNotReceivedCode')}
            </Text>

            <CustomTextLink
              label={translate('txtResend')}
              style={styles.textBoldStyle}
              onPress={resendCodeRequest}
            />
          </View>
        )}

        {/**code send past number of max count */}
        {/* {getCodeCount <= 0 && (
          <View style={styles.resendCodeStyle}>
            <Text style={styles.textStyle}>
              {translate('txtNotReceivedCode')}
            </Text>

            <CustomTextLink
              label={translate('txtContactSupport')}
              style={styles.textBoldStyle}
              onPress={resendCodeRequest}
            />
          </View>
        )} */}
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
  btnStyle: { marginTop: 80, width: '65%' },

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

  textHighlightStyle: {
    ...AppStyles.fonts.text,
    color: AppStyles.colors.button,
    textAlign: 'center',
    marginVertical: 10,
  },

  resendCodeStyle: {
    flexDirection: 'row',
    height: 50,
    marginVertical: 50,
  },
});
