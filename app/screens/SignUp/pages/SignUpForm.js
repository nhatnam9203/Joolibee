import {
  CustomBirthdayPicker,
  CustomButton,
  CustomInput,
  CustomModal,
  CustomPickerSelect,
  CustomTextLink,
} from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { clearSignupState, signUp } from '@slices/account';
import { AppStyles, images } from '@theme';
import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import {
  ButtonCC,
  PasswordInput,
  TextCheckBox,
  TextInputErrorMessage,
} from '../../components';
import ScreenName from '../../ScreenName';

const BUTTON_HEIGHT = 60;
const LAYOUT_WIDTH = '90%';
const FULL_WIDTH = '100%';

export const SignUpForm = () => {
  const navigation = useNavigation();
  // redux
  const dispatch = useDispatch();

  // validate form
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, translate('txtTooShort'))
      .max(50, translate('txtTooLong'))
      .required(translate('txtRequired')),
    email: Yup.string().email(translate('txtInvalidEmail')),
    password: Yup.string()
      .min(6, translate('txtTooShort'))
      .max(30, translate('txtTooLong'))
      .required(translate('txtRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], translate('txtPasswordMatch'))
      .min(6, translate('txtTooShort'))
      .max(30, translate('txtTooLong'))
      .required(translate('txtRequired')),
    privacyChecked: Yup.bool()
      .oneOf([true], translate('txtPrivacyRequired'))
      .required(translate('txtPrivacyRequired')),
    publicMailChecked: Yup.bool(),
  });

  // state

  const signUpError = useSelector((state) => state.account.signUpError);
  const signUpSuccess = useSelector((state) => state.account.signUpSuccess);

  // function
  const signUpDataSubmit = React.useCallback(
    (values) => {
      const action = signUp(values, { dispatch });
      dispatch(action);
    },
    [dispatch],
  );

  const goSignInPage = () => {
    const action = clearSignupState();
    dispatch(action);
    navigation.navigate(ScreenName.SignIn);
  };

  // React.useEffect(() => {
  //   const resetSignupState = () => {
  //     const action = clearSignupState();
  //     dispatch(action);
  //   };

  //   return resetSignupState();
  // }, [dispatch]);

  // render
  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.background}>
      <Formik
        initialValues={{
          email: '',
          name: '',
          phone: '',
          password: '',
          confirmPassword: '',
          birthday: '',
          gender: '',
        }}
        onSubmit={signUpDataSubmit}
        validationSchema={SignupSchema}
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
          <SafeAreaView>
            <View style={styles.container}>
              <View style={styles.topContent}>
                <CustomInput
                  style={{ width: LAYOUT_WIDTH }}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder={translate('txtInputName')}
                  textContentType="name"
                />
                {/**Name input error */}
                {errors.name && touched.name && (
                  <TextInputErrorMessage
                    style={{ width: LAYOUT_WIDTH }}
                    message={errors.name}
                    color={AppStyles.colors.button}
                  />
                )}

                <CustomInput
                  style={{ width: LAYOUT_WIDTH }}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  placeholder={translate('txtInputPhone')}
                  editable={false}
                  textContentType="telephoneNumber">
                  <View style={styles.btnIcon}>
                    <Image
                      source={images.icons.ic_check_success}
                      style={styles.imgIconStyle}
                    />
                  </View>
                </CustomInput>

                <CustomInput
                  style={{ width: LAYOUT_WIDTH }}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder={translate('txtInputEmail')}
                  textContentType="emailAddress"
                />
                {/**Email input error */}
                {errors.email && touched.email && (
                  <TextInputErrorMessage
                    style={{ width: LAYOUT_WIDTH }}
                    message={errors.email}
                    color={AppStyles.colors.button}
                  />
                )}

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
                    message={errors.password}
                    color={AppStyles.colors.button}
                  />
                )}

                <PasswordInput
                  style={{ width: LAYOUT_WIDTH }}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.password}
                  placeholder={translate('txtInputConfirmPassword')}
                  textContentType="password"
                />
                {/**Confirm password input error */}
                {errors.confirmPassword && (
                  <TextInputErrorMessage
                    style={{ width: LAYOUT_WIDTH }}
                    message={errors.confirmPassword}
                    color={AppStyles.colors.button}
                  />
                )}

                <View style={styles.pickerContentStyle}>
                  <CustomBirthdayPicker
                    onChangeDate={handleChange('birthday')}
                    defaultValue={values.birthday}
                    renderBase={() => (
                      <CustomInput
                        style={{ width: FULL_WIDTH }}
                        onBlur={handleBlur('birthday')}
                        value={values.birthday}
                        placeholder={translate('txtPickerDate')}
                        pointerEvents="none">
                        <View style={styles.btnIcon}>
                          <Image
                            source={images.icons.ic_calendar}
                            style={styles.imgIconStyle}
                          />
                        </View>
                      </CustomInput>
                    )}
                  />

                  <CustomPickerSelect
                    style={{ width: FULL_WIDTH }}
                    items={[
                      { label: translate('txtMale'), value: 1 },
                      { label: translate('txtFemale'), value: 0 },
                    ]}
                    placeholder={translate('txtPickerGender')}
                    defaultValue={values.gender}
                    onChangeItem={(item) => setFieldValue('gender', item.value)}
                  />
                </View>

                {/**Server response error */}
                {!_.isEmpty(signUpError) &&
                  Object.values(signUpError).map((item, index) => (
                    <TextInputErrorMessage
                      style={{ width: LAYOUT_WIDTH }}
                      message={item}
                      color={AppStyles.colors.button}
                      key={index}
                    />
                  ))}

                <View style={styles.checkBoxContent}>
                  <TextCheckBox
                    label={translate('txtPrivacy')}
                    value={values.privacyChecked}
                    onValueChange={() =>
                      setFieldValue('privacyChecked', !values.privacyChecked)
                    }
                    normalColor="#989898"
                  />

                  <CustomTextLink
                    label={translate('txtPrivacyLink')}
                    style={styles.txtForgotPass}
                  />
                </View>

                {/**policy input error */}
                {errors.privacyChecked && (
                  <TextInputErrorMessage
                    style={{ width: LAYOUT_WIDTH }}
                    message={errors.privacyChecked}
                    color={AppStyles.colors.button}
                  />
                )}

                <View style={styles.checkBoxContent}>
                  <TextCheckBox
                    label={translate('txtPrivacyMail')}
                    value={values.publicMailChecked}
                    onValueChange={() =>
                      setFieldValue(
                        'publicMailChecked',
                        !values.publicMailChecked,
                      )
                    }
                    normalColor="#989898"
                  />
                </View>
              </View>

              <View style={styles.bottomContent}>
                {/**SIGN IN*/}
                <ButtonCC.ButtonRed
                  onPress={handleSubmit}
                  label={translate('txtSignUp')}
                />

                {/**FACEBOOK*/}
                <ButtonCC.ButtonFacebook onPress={handleSubmit} />

                {/**GOOGLE*/}
                <ButtonCC.ButtonGoogle onPress={handleSubmit} />

                {/**SIGN UP*/}
                <View style={styles.textContent}>
                  <Text style={styles.txtStyle}>
                    {translate('txtHaveAccount')}
                  </Text>

                  <CustomTextLink
                    label={translate('txtSignIn')}
                    style={styles.txtSignIn}
                  />
                </View>
              </View>
            </View>
          </SafeAreaView>
        )}
      </Formik>

      <PopupSignUpSuccess showModal={signUpSuccess} onPress={goSignInPage} />
    </SinglePageLayout>
  );
};

const POPUP_BUTTON_WIDTH = 200;
const PopupSignUpSuccess = ({ onPress, showModal }) => (
  <CustomModal.CustomModal showModal={showModal}>
    <Image source={images.icons.ic_succeeded} />
    <CustomModal.CustomModalTitle>
      {translate('txtSignupSuccess')}
    </CustomModal.CustomModalTitle>
    <CustomButton
      style={styles.btnStyle}
      onPress={onPress}
      width={POPUP_BUTTON_WIDTH}
      height={BUTTON_HEIGHT}
      label={translate('txtSignIn')}
      borderColor={AppStyles.colors.button}
      textColor={AppStyles.colors.text}
      bgColor={AppStyles.colors.button}
    />
  </CustomModal.CustomModal>
);

const styles = StyleSheet.create({
  avoidContainer: { flex: 1, backgroundColor: AppStyles.colors.background },

  container: {
    flex: 1,
  },

  topContent: {
    alignItems: 'center',
  },

  scrollContentContainer: {
    paddingVertical: 0,
  },

  // privacy
  textContent: {
    flexDirection: 'row',
    height: 25,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    marginTop: 20,
  },

  checkBoxContent: {
    flexDirection: 'row',
    height: 25,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginVertical: 10,
    marginLeft: 10,
    width: LAYOUT_WIDTH,
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

  bottomContent: {
    marginVertical: 10,
    flex: 0,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
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

  errorContent: {
    flex: 0,
    marginHorizontal: 15,
    marginBottom: 10,
  },

  txtErrorMessage: {
    color: AppStyles.colors.accent,
    ...AppStyles.fonts.mini,
  },

  pickerContentStyle: {
    width: LAYOUT_WIDTH,
    alignItems: 'center',
    marginBottom: 10,
  },
});
