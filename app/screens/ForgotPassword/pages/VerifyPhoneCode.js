import { CustomInput, CustomTextLink } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import { format, validate } from '@utils';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { ButtonCC, LabelTitle, TextInputErrorMessage } from '../../components';
import { app } from '@slices';
import { useCountDown } from '@hooks';
import { useDispatch, useSelector } from 'react-redux';
const LAYOUT_WIDTH = '90%';
export const VerifyPhoneCode = ({
  infos,
  resendCode,
  confirmCode,
  timeOut,
}) => {
  const { phone = 'undefine', error } = infos  || {};
  const dispatch = useDispatch();
  const isSpam = useSelector((state) => state.app?.isSpam);
  // count number get code call
  // time count down
  const second = useCountDown({
    time: timeOut,
    callBackEnd: () => {
      dispatch(app.toggleBlockSpam(false));
      setTiming(false);
    },
  });
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
    if (resendCode) {
      resendCode();
    }
  };

  React.useEffect(() => {
    setTiming(true);
  }, []);

  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.accent}>
      <Animated.View style={styles.container}>
        <LabelTitle label={translate('txtPhoneCode')} color="#fff" />
        <Text style={styles.textStyle}>
          {translate('txtInputPhoneDesc1') +
            ' ' +
            phone +
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
              format.pad_(second, 2) +
              ') ' +
              translate('txtSecondUnit')}
          </Text>
        )}

        <ButtonCC.ButtonYellow
          label={translate('txtContinue')}
          style={styles.btnStyle}
          onPress={verifyCode}
          disabled={isSpam || validate.isEmptyString(codeInput)}
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
