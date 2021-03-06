import { CustomInput, CustomTextLink } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { get, saveValueWithExpires, StorageKey } from '@storage';
import { AppStyles } from '@theme';
import { format, validate } from '@utils';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import Config from 'react-native-config';
import { useDispatch } from 'react-redux';
import { ButtonCC, LabelTitle } from '../../components';
import { TextInputErrorMessage } from '../../components';

const COUNTDOWN_SECONDS = 60;
const TIME_WAITING = COUNTDOWN_SECONDS - 45;
const LAYOUT_WIDTH = '90%';

export const VerifyPhoneCode = ({ infos, resendCode, confirmCode }) => {
  const { phone = undefined, error } = infos || {};
  var interval;
  const dispatch = useDispatch();
  // count number get code call
  const [getCodeCount, updateGetCodeCount] = React.useState(0);
  // time count down
  const [timer, setSecond] = React.useState(COUNTDOWN_SECONDS);
  // start count down
  const [timing, setTiming] = React.useState(false);
  const [codeInput, setCodeInput] = React.useState(null);

  const verifyCode = () => {
    if (validate.isEmptyString(codeInput)) {
      return;
    }

    confirmCode(codeInput);
  };

  const resetTimer = () => {
    setTiming(false);
    if (interval) {
      clearInterval(interval);
    }
    setSecond(COUNTDOWN_SECONDS);
  };

  // Request firebase send code to phone,
  const resendCodeRequest = () => {
    if (getCodeCount > 0) {
      resetTimer();
      const sendCodeCount = getCodeCount - 1;
      // count number get code
      updateGetCodeCount(sendCodeCount);
      // storage resend code request times
      saveValueWithExpires(
        StorageKey.FirebaseCodeSendCount + phone,
        sendCodeCount,
        Config.RESEND_FIREBASE_CODE_TIME_BLOCK,
      );

      // call send code
      if (typeof resendCode === 'function') {
        resendCode({ phone });
        setTiming(true);
      }
    }
  };

  const convertMaskPhoneNumber = (phone = '') => {
    let start_phone = phone?.substring(0, 4);
    let end_phone = phone?.substring(phone?.length, phone?.length - 2);
    return start_phone + '****' + end_phone;
  };

  React.useEffect(() => {
    if (phone) {
      const getResendCount = async () => {
        const numOfCount = await get(StorageKey.FirebaseCodeSendCount + phone);
        if (typeof numOfCount === 'number') {
          updateGetCodeCount(numOfCount);
        } else {
          updateGetCodeCount(Config.RESEND_FIREBASE_CODE_COUNT);
        }
      };

      getResendCount();
    }
  }, [phone]);

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
            return COUNTDOWN_SECONDS;
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
            convertMaskPhoneNumber(phone) +
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
        {(!timing || timer < TIME_WAITING) && getCodeCount > 0 && (
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
        {getCodeCount <= 0 && (
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
        )}
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
