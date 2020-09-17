import { CustomButton, CustomInput, CustomTextLink } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import { Formik } from 'formik';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  PasswordInput,
  JollibeeLogo,
  LabelTitle,
  TextCheckBox,
  ButtonCC,
} from '../components';

const LAYOUT_WIDTH = '90%';

const SignInScreen = () => {
  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.button}>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => console.log(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            {/**Red*/}
            <View style={styles.topContent}>
              {/**LOGO */}
              <JollibeeLogo />

              {/**TITLE */}
              <LabelTitle label={translate('txtPleaseSignIn')} />

              {/**PHONE*/}
              <CustomInput
                style={{ width: LAYOUT_WIDTH }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={translate('txtInputPhone')}
                textContentType="telephoneNumber"
              />

              {/**PASSWORD*/}
              <PasswordInput
                style={{ width: LAYOUT_WIDTH }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder={translate('txtInputPassword')}
                textContentType="password"
              />

              {/**REMEMBER*/}
              <View style={styles.rememberStyle}>
                <TextCheckBox
                  label={translate('txtRemember')}
                  value={values.publicMailChecked}
                  onValueChange={() => {}}
                  normalColor="#fff"
                />

                <CustomTextLink
                  label={translate('txtForgetPassWord')}
                  style={styles.txtForgotPass}
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
              <ButtonCC.ButtonFacebook onPress={handleSubmit} />

              {/**GOOGLE*/}
              <ButtonCC.ButtonGoogle onPress={handleSubmit} />

              {/**SIGN UP*/}
              <View style={styles.textContent}>
                <Text style={styles.txtStyle}>
                  {translate('txtNotHaveAccount')}
                </Text>

                <CustomTextLink
                  label={translate('txtSignUpNow')}
                  style={styles.txtSignIn}
                />
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SinglePageLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  topContent: {
    backgroundColor: AppStyles.colors.accent,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingTop: 50,
  },

  bottomContent: {
    marginVertical: 20,
    flex: 0,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
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
