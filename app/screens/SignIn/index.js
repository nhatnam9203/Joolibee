import { CustomInput, CustomTextLink } from '@components';
import {
  AppScrollViewIOSBounceColorsWrapper,
  SinglePageLayout,
} from '@layouts';
import { translate } from '@localize';
import { statusCodes } from '@react-native-community/google-signin';
import { useNavigation } from '@react-navigation/native';
import { account, app } from '@slices';
import { loginFb, loginGoogle } from '@social';
import { AppStyles, images } from '@theme';
import { regex } from '@utils';
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
import { GEX } from '@graphql';
import { PopupComingSoon } from '../components';

const LAYOUT_WIDTH = '90%';

const SignInScreen = () => {
  const navigation = useNavigation();
  // redux
  const dispatch = useDispatch();

  const SignInSchema = Yup.object().shape({
    username: Yup.string()
      .required(translate('txtRequired'))
      .matches(regex.phone, translate('txtWrongPhoneNumber'))
      .min(10, translate('txtTooShort'))
      .max(30, translate('txtTooLong')),
    password: Yup.string().required(translate('txtRequired')),
    remember: Yup.bool(),
  });

  const signInError = useSelector((state) => state.account?.signInError);
  const showComingSoon = useSelector((state) => state.app.comingSoonShow);

  const [, signIn] = GEX.useGenerateToken();
  const [, signinSocial] = GEX.useGenerateTokenBySocial();
  const signInSubmit = React.useCallback(
    async ({ username, ...values }) => {
      //refactor data, do hệ thống đăng nhập bắng sô đt, trên graphql dùng field email đề đăng kí nên cần format lại
      let submitData = Object.assign({}, values, { email: username });

      // let submitData = values;
      // if (validate.phoneNumber(username)) {
      //   submitData = Object.assign({}, data, { email: username });
      // }

      // if (validate.email(username)) {
      //   submitData = Object.assign({}, data, { email: username });
      // }
      await dispatch(app.showLoading());
      await dispatch(app.savePhoneVerify(username));
      signIn({ variables: submitData });
    },
    [dispatch, signIn],
  );
  // -------social SignIn Submit
  const socialSignInSubmit = React.useCallback(
    async (submitData) => {
      signinSocial({ variables: submitData });
    },
    [signinSocial],
  );

  const goSignUpPage = () => {
    navigation.navigate(ScreenName.NewSignUp, {
      customerToken: null,
      typeVerify: 'create',
    });
  };

  const goForgotPasswordScreen = () => {
    navigation.navigate(ScreenName.ForgotPassword);
  };

  const signinFB = async () => {
    await dispatch(app.showLoading());
    try {
      const data = await loginFb();
      let submitData = { type: 'Facebook', token: data?.accessToken };
      socialSignInSubmit(submitData);
    } catch (error) {
      await dispatch(app.hideLoading());
    }
  };

  const signinGoogle = async () => {
    await dispatch(app.showLoading());
    try {
      const data = await loginGoogle();
      let submitData = { type: 'Google', token: data?.idToken };
      socialSignInSubmit(submitData);
    } catch (error) {
      await dispatch(app.hideLoading());
      if (error === statusCodes.SIGN_IN_CANCELLED) {
        return;
      } else if (error === statusCodes.IN_PROGRESS) {
        return;
      } else if (error === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('play services not available or outdated');
      } else {
        alert('something went wrong');
      }
    }
  };

  //Handle Response social signin

  return (
    <>
      <AppScrollViewIOSBounceColorsWrapper
        style={styles.container}
        topBounceColor={AppStyles.colors.accent}
        bottomBounceColor={AppStyles.colors.button}>
        <SinglePageLayout>
          <Formik
            initialValues={{
              username: null,
              password: null,
            }}
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
                  <LabelTitle
                    label={translate('txtPleaseSignIn')}
                    color="#fff"
                    style={styles.titleStyle}
                  />

                  {/**PHONE*/}
                  <CustomInput
                    style={{ width: LAYOUT_WIDTH }}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    placeholder={translate('txtInputPhone')}
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                  />

                  {/**Phone input error, do loi server tra ve ghe qua nen ko dung errors.username */}
                  {errors.username && touched.username && (
                    <TextInputErrorMessage
                      style={{ width: LAYOUT_WIDTH }}
                      message={translate('txtWrongUsername')}
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

                  {/**Password input error, do loi server tra ve ghe qua nen ko dung errors.password */}
                  {errors.password && touched.password && (
                    <TextInputErrorMessage
                      style={{ width: LAYOUT_WIDTH }}
                      message={translate('txtWrongPassword')}
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
                      // label={translate('txtRemember')}
                      value={values.remember}
                      onValueChange={() =>
                        setFieldValue('remember', !values.remember)
                      }
                      normalColor="#fff"
                      fillColor={true}
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
                  {/* <ButtonCC.ButtonFacebook /> */}
                  <ButtonCC.ButtonFacebook onPress={signinFB} />

                  {/**GOOGLE*/}
                  {/* <ButtonCC.ButtonGoogle /> */}
                  <ButtonCC.ButtonGoogle onPress={signinGoogle} />

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

      {/**Popup ComingSoon */}
      <PopupComingSoon
        visible={showComingSoon}
        onToggle={() => dispatch(app.dismissComingSoon())}
      />
    </>
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

  txtForgotPass: { ...AppStyles.fonts.bold, color: '#fff', fontSize: 16 },

  txtSignIn: { ...AppStyles.fonts.bold, color: '#1B1B1B' },

  titleStyle: { marginTop: 15, marginBottom: 10 },
});

export default SignInScreen;
