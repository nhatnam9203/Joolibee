import { CustomButton, CustomCheckBox, CustomInput } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import { Formik } from 'formik';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BUTTON_HEIGHT = 60;
const LAYOUT_WIDTH = '90%';

const SignInScreen = () => {
  // state
  const [hidePassword, setHidePassword] = React.useState(true);

  const visiblePasswordButtonPressed = React.useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);

  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.button}>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={(values) => console.log(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <View style={styles.inputContent}>
              <Image source={images.icons.logo} />

              <Text style={styles.labelTitle}>
                {`${translate('txtPleaseSignIn')}`.toUpperCase()}
              </Text>

              <CustomInput
                style={{ width: LAYOUT_WIDTH }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                placeholder={translate('txtInputPhone')}
                textContentType="telephoneNumber"
              />

              <CustomInput
                style={{ width: LAYOUT_WIDTH }}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                placeholder={translate('txtInputPassword')}
                // secureTextEntry={hidePassword}
                textContentType="password"
                blurOnSubmit={false}>
                <ButtonVisiblePassword
                  onPress={visiblePasswordButtonPressed}
                  visible={hidePassword}
                />
              </CustomInput>

              <View style={styles.remindStyle}>
                <View style={styles.textContent}>
                  <CustomCheckBox
                    normalColor="#fff"
                    value={values.publicMailChecked}
                    onValueChange={() => {}}
                  />
                  <Text style={[styles.txtStyle, { color: '#fff' }]}>
                    {translate('txtRemember')}
                  </Text>
                </View>

                <Text
                  style={[styles.txtBoldStyleLink, { color: '#fff' }]}
                  onPress={() => {}}>
                  {translate('txtForgetPassWord')}
                </Text>
              </View>

              <View style={styles.polygonStyle}>
                <Image source={images.login_polygon} />
              </View>
            </View>

            <View style={styles.btnContent}>
              <CustomButton
                style={styles.btnStyle}
                onPress={handleSubmit}
                width={LAYOUT_WIDTH}
                height={BUTTON_HEIGHT}
                label={translate('txtSignIn')}
                borderColor={AppStyles.colors.accent}
                textColor="#fff"
                bgColor={AppStyles.colors.accent}
              />

              <CustomButton
                style={styles.btnStyle}
                onPress={handleSubmit}
                width={LAYOUT_WIDTH}
                height={BUTTON_HEIGHT}
                label={translate('txtSignInFacebook')}
                borderColor="#1976D2"
                textColor="#fff"
                bgColor="#1976D2">
                <Image
                  source={images.icons.ic_facebook}
                  style={styles.imgIconStyle}
                />
              </CustomButton>

              <CustomButton
                style={styles.btnStyle}
                onPress={handleSubmit}
                width={LAYOUT_WIDTH}
                height={BUTTON_HEIGHT}
                label={translate('txtSignInGoogle')}
                borderColor="#fff"
                textColor="#1B1B1B"
                bgColor="#fff">
                <Image
                  source={images.icons.ic_google}
                  style={styles.imgIconStyle}
                />
              </CustomButton>

              <View style={styles.textContent}>
                <Text style={styles.txtStyle}>
                  {translate('txtHaveAccount')}
                </Text>
                <Text
                  style={[styles.txtBoldStyleLink, { color: '#1B1B1B' }]}
                  onPress={() => {}}>
                  {translate('txtSignIn')}
                </Text>
              </View>
            </View>
          </View>
        )}
      </Formik>
    </SinglePageLayout>
  );
};

// Layout button eye -> hide/show secureTextEntry password
const ButtonVisiblePassword = ({ onPress, visible }) => (
  <TouchableOpacity style={styles.btnIcon} onPress={onPress} activeOpacity={1}>
    <Image
      source={images.icons.ic_hide_password}
      style={[
        styles.imgIconStyle,
        // eslint-disable-next-line react-native/no-inline-styles
        { tintColor: visible ? '#9E9E9E' : '#9E9E9E80' },
      ]}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1 },

  inputContent: {
    backgroundColor: AppStyles.colors.accent,
    paddingHorizontal: 10,
    alignItems: 'center',
    paddingTop: 50,
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

  txtStyleLink: {
    ...AppStyles.fonts.text,
    textDecorationLine: 'underline',
    color: '#0696F8',
    marginLeft: 5,
  },

  txtBoldStyleLink: {
    ...AppStyles.fonts.text,
    fontFamily: 'Roboto-Bold',
    textDecorationLine: 'underline',
    color: '#0696F8',
    marginLeft: 5,
  },

  btnContent: {
    marginVertical: 20,
    flex: 0,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 20,
  },

  btnStyle: {
    marginVertical: 10,
    ...AppStyles.styles.shadow,
  },

  imgIconStyle: { resizeMode: 'center' },

  btnIconStyle: {
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelTitle: {
    ...AppStyles.fonts.title,
    fontWeight: 'bold',
    marginVertical: 20,
  },

  remindStyle: {
    width: LAYOUT_WIDTH,
    height: 50,
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  polygonStyle: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    right: 0,
    flex: 0,
    alignItems: 'center',
  },
});

export default SignInScreen;
