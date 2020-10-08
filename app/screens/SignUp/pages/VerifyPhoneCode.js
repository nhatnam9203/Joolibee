import { CustomInput, CustomTextLink } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { ButtonCC, LabelTitle } from '../../components';
import { format } from '@utils';

const COUNTDOWN_SECONDS = 10;
const GET_CODE_COUNT_MAX = 3;

export const VerifyPhoneCode = ({ infos, next }) => {
  const { phone = 'undefine' } = infos;
  var interval;
  // count number get code call
  const [getCodeCount, updateGetCodeCount] = React.useState(GET_CODE_COUNT_MAX);
  // time count down
  const [timer, setSecond] = React.useState(COUNTDOWN_SECONDS);
  // start count down
  const [timing, setTiming] = React.useState(false);

  const verifyCode = () => {
    next(infos);
  };

  const resendCode = () => {};
  const getCode = () => {
    if (!timing && getCodeCount > 0) {
      // count number get code
      updateGetCodeCount(getCodeCount - 1);
      // call send code
      if (resendCode) {
        resendCode();
      }
      // start timer
      setTiming(true);
    }
  };

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

  React.useEffect(() => {
    setTiming(true);
  }, []);

  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.accent}>
      <Animated.View style={styles.container}>
        <LabelTitle label={translate('txtPhoneCode')} color="#fff" />
        <Text style={styles.textStyle}>
          {translate('txtInputPhoneDesc1') +
            phone +
            translate('txtInputPhoneDesc2')}
        </Text>
        <CustomInput
          placeholder={translate('txtPhoneCode')}
          autoFocus={true}
          textContentType="telephoneNumber"
          keyboardType="numeric"
        />
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
          disabled={timing}
        />
        <View style={styles.resendCodeStyle}>
          <Text style={styles.textStyle}>
            {translate('txtNotReceivedCode')}
          </Text>

          <CustomTextLink
            label={translate('txtResend')}
            style={styles.textBoldStyle}
            onPress={resendCode}
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
    marginBottom: 10,
  },

  resendCodeStyle: {
    flexDirection: 'row',
    height: 50,
    marginVertical: 50,
  },
});
