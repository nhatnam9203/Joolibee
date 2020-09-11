import { CustomButton, CustomInput } from '@components';
import { translate } from '@localize';
import CheckBox from '@react-native-community/checkbox';
import { AppStyles, metrics } from '@theme';
import { Formik } from 'formik';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { showLoading } from '@slices/app';

const BUTTON_HEIGHT = 60;
const BUTTON_WIDTH = '98%';

const SignUpScreen = () => {
  const dispatch = useDispatch();

  const signUpButtonPressed = React.useCallback(() => {
    const action = showLoading();
    dispatch(action);
  }, [dispatch]);

  return (
    <KeyboardAvoidingView
      style={styles.avoidContainer}
      keyboardVerticalOffset={54}
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => console.log(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.content}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              bounces={false}
              contentContainerStyle={styles.scrollContentContainer}>
              <CustomInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={translate('txtInputName')}
              />

              <CustomInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={translate('txtInputPhone')}
              />

              <CustomInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={translate('txtInputEmail')}
              />

              <CustomInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={translate('txtInputPassword')}
              />

              <CustomInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={translate('txtInputConfirmPassword')}
              />

              <CustomInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={translate('txtPickerDate')}
              />

              <CustomInput
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={translate('txtPickerGender')}
              />

              <View style={styles.privacyContent}>
                <CheckBox
                  style={styles.checkBoxStyle}
                  boxType="square"
                  tintColors={{ true: '#989898', false: '#989898' }}
                  tintColor="#989898"
                  onCheckColor="#3FB4C3"
                  onTintColor="#3FB4C3"
                  animationDuration={0.25}
                />
                <Text style={styles.txtPrivacy}>{translate('txtPrivacy')}</Text>
                <Text style={styles.txtPrivacyLink} onPress={() => {}}>
                  {translate('txtPrivacyLink')}
                </Text>
              </View>

              <View style={styles.privacyContent}>
                <CheckBox
                  style={styles.checkBoxStyle}
                  boxType="square"
                  tintColors={{ true: '#989898', false: '#989898' }}
                  tintColor="#989898"
                  onCheckColor="#3FB4C3"
                  onTintColor="#3FB4C3"
                  animationDuration={0.25}
                />
                <Text style={styles.txtPrivacy}>
                  {translate('txtPrivacyMail')}
                </Text>
              </View>

              <View style={styles.btnContent}>
                <CustomButton
                  style={styles.btnStyle}
                  onPress={signUpButtonPressed}
                  width={BUTTON_WIDTH}
                  height={BUTTON_HEIGHT}
                  label={translate('txtSignUp')}
                  borderColor={AppStyles.colors.accent}
                  textColor="#fff"
                  bgColor={AppStyles.colors.accent}
                />

                <CustomButton
                  style={styles.btnStyle}
                  onPress={handleSubmit}
                  width={BUTTON_WIDTH}
                  height={BUTTON_HEIGHT}
                  label={translate('txtSignUpFacebook')}
                  borderColor="#1976D2"
                  textColor="#fff"
                  bgColor="#1976D2"
                />

                <CustomButton
                  style={styles.btnStyle}
                  onPress={handleSubmit}
                  width={BUTTON_WIDTH}
                  height={BUTTON_HEIGHT}
                  label={translate('txtSignUpGoogle')}
                  borderColor="#fff"
                  textColor="#1B1B1B"
                  bgColor="#fff"
                />
              </View>
            </ScrollView>
          </View>
        )}
      </Formik>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  avoidContainer: { flex: 1, backgroundColor: AppStyles.colors.background },

  container: {
    flex: 1,
  },

  content: {
    flex: 0,
    margin: metrics.padding,
  },

  scrollContentContainer: {
    paddingVertical: 0,
  },

  // privacy
  privacyContent: {
    flexDirection: 'row',
    height: 23,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    marginTop: 30,
  },

  checkBoxStyle: {
    marginRight: 5,
    width: 23,
    height: 23,
  },

  txtPrivacy: {
    ...AppStyles.fonts.text,
    marginLeft: 5,
  },

  txtPrivacyLink: {
    ...AppStyles.fonts.text,
    textDecorationLine: 'underline',
    color: '#0696F8',
    marginLeft: 5,
  },

  btnContent: {
    marginVertical: 20,
    flex: 0,
    alignItems: 'center',
  },

  btnStyle: {
    marginVertical: 10,
    ...AppStyles.styles.shadow,
  },
});

export default SignUpScreen;
