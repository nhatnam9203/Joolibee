import { CustomInput, CustomTextLink } from '@components';
import {
  SinglePageLayout,
  AppScrollViewIOSBounceColorsWrapper,
} from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { signIn } from '@slices/account';
import { AppStyles, images } from '@theme';
import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  ButtonCC,
  JollibeeLogo,
  LabelTitle,
  PasswordInput,
  TextCheckBox,
  TextInputErrorMessage,
} from '../components';
import ScreenName from '../ScreenName';
import { regex } from '@utils';

const LAYOUT_WIDTH = '90%';

const SignInScreen = () => {
  const navigation = useNavigation();
  // redux
  const dispatch = useDispatch();

  const SignInSchema = Yup.object().shape({
    phone: Yup.string(),
    // .required(translate('txtRequired'))
    // .matches(regex.phone, translate('txtWrongPhoneNumber'))
    // .min(10, translate('txtTooShort'))
    // .max(15, translate('txtTooLong')),
    password: Yup.string(),
    // .required(translate('txtRequired')),
    remember: Yup.bool(),
  });

  const signInError = useSelector((state) => state.account.signInError);

  const signInSubmit = React.useCallback(
    (values) => {
      const action = signIn(values, { dispatch });
      dispatch(action);
    },
    [dispatch],
  );

  const goSignUpPage = () => {
    navigation.navigate(ScreenName.SignUp);
  };

  const goForgotPasswordScreen = () => {
    navigation.navigate(ScreenName.ForgotPassword);
  };

  return (
    <AppScrollViewIOSBounceColorsWrapper
      style={styles.container}
      topBounceColor={AppStyles.colors.accent}
      bottomBounceColor={AppStyles.colors.button}>
      <SinglePageLayout>
        <Formik
          initialValues={{ phone: '', password: '', email: 'nha@gmail.com' }}
          onSubmit={signInSubmit}
          validationSchema={SignInSchema}
          isValidating={true}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
          }) => (
            <View style={styles.container}>
              {/**Red*/}
              <View style={styles.topContent}>
                {/**LOGO */}
                <JollibeeLogo />

                {/**TITLE */}
                <LabelTitle label={translate('txtPleaseSignIn')} color="#fff" />

                {/**PHONE*/}
                <CustomInput
                  style={{ width: LAYOUT_WIDTH }}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholder={translate('txtInputPhone')}
                  textContentType="telephoneNumber"
                  keyboardType="phone-pad"
                />

                {/**Phone input error */}
                {errors.phone && touched.phone && (
                  <TextInputErrorMessage
                    style={{ width: LAYOUT_WIDTH }}
                    message={errors.phone}
                    color={AppStyles.colors.inputError}
                  />
                )}

                {/**PASSWORD*/}
                <PasswordInput
                  style={{ width: LAYOUT_WIDTH }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder={translate('txtInputPassword')}
                  textContentType="password"
                />
                {/**Password input error */}
                {errors.password && touched.password && (
                  <TextInputErrorMessage
                    style={{ width: LAYOUT_WIDTH }}
                    messages={errors.password}
                    color={AppStyles.colors.inputError}
                  />
                )}

                {/**Server response error */}
                {!_.isEmpty(signInError) &&
                  Object.values(signInError).map((item, index) => (
                    <TextInputErrorMessage
                      style={{ width: LAYOUT_WIDTH }}
                      message={item}
                      color={AppStyles.colors.inputError}
                      key={index}
                    />
                  ))}

                {/**REMEMBER*/}
                <View style={styles.rememberStyle}>
                  <TextCheckBox
                    label={translate('txtRemember')}
                    value={values.remember}
                    onValueChange={() =>
                      setFieldValue('remember', !values.remember)
                    }
                    normalColor="#fff"
                  />

                  <CustomTextLink
                    label={translate('txtForgetPassWord')}
                    style={styles.txtForgotPass}
                    onPress={goForgotPasswordScreen}
                  />
                </View>

                <View style={styles.polygonStyle}>
                  <Image source={images.login_polygon} />
                </View>
              </View>

              {/**Yellow*/}
              <View style={styles.bottomContent}>
                {/**SIGN IN*/}
                <ButtonCC.ButtonRed
                  onPress={handleSubmit}
                  label={translate('txtSignIn')}
                />

                {/**FACEBOOK*/}
                <ButtonCC.ButtonFacebook />

                {/**GOOGLE*/}
                <ButtonCC.ButtonGoogle />

                {/**SIGN UP*/}
                <View style={styles.textContent}>
                  <Text style={styles.txtStyle}>
                    {translate('txtNotHaveAccount')}
                  </Text>

                  <CustomTextLink
                    label={translate('txtSignUpNow')}
                    style={styles.txtSignIn}
                    onPress={goSignUpPage}
                  />
                </View>
              </View>
            </View>
          )}
        </Formik>
      </SinglePageLayout>
    </AppScrollViewIOSBounceColorsWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  topContent: {
    backgroundColor: AppStyles.colors.accent,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingTop: 50,
    zIndex: 1,
  },

  bottomContent: {
    marginBottom: 20,
    flex: 0,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 50,
    backgroundColor: AppStyles.colors.button,
    zIndex: 0,
  },

  textContent: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
  },

  txtStyle: {
    ...AppStyles.fonts.text,
    marginLeft: 5,
  },

  btnStyle: {
    marginVertical: 10,
    ...AppStyles.styles.shadow,
  },

  rememberStyle: {
    width: LAYOUT_WIDTH,
    height: 35,
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  polygonStyle: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    right: 0,
    flex: 0,
    alignItems: 'center',
  },

  txtForgotPass: { color: '#fff' },

  txtSignIn: { color: '#1B1B1B' },
});

export default SignInScreen;
