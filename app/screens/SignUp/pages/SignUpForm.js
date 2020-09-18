import {
  CustomBirthdayPicker,
  CustomButton,
  CustomCheckBox,
  CustomInput,
  CustomPickerSelect,
  CustomModal,
} from '@components';
import { translate } from '@localize';
import { signUp, clearSignupState } from '@slices/account';
import { AppStyles, images, metrics } from '@theme';
import { Formik } from 'formik';
import _ from 'lodash';
import React from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { isIphoneX } from '../../../lib/isIphoneX';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../../ScreenName';

const BUTTON_HEIGHT = 60;
const BUTTON_WIDTH = '98%';

const SignUpForm = () => {
  const navigation = useNavigation();
  // redux
  const dispatch = useDispatch();

  // validate form
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, translate('txtTooShort'))
      .max(50, translate('txtTooShort'))
      .required(translate('txtRequired')),
    email: Yup.string().email(translate('txtInvalidEmail')),
    password: Yup.string().required(translate('txtRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], translate('txtPasswordMatch'))
      .required(translate('txtRequired')),
    privacyChecked: Yup.bool()
      .oneOf([true], translate('txtPrivacyRequired'))
      .required(translate('txtPrivacyRequired')),
    publicMailChecked: Yup.bool(),
  });

  // state
  const [hidePassword, setHidePassword] = React.useState(true);

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

  const visiblePasswordButtonPressed = React.useCallback(() => {
    setHidePassword(!hidePassword);
  }, [hidePassword]);

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
    <KeyboardAvoidingView
      style={styles.avoidContainer}
      keyboardVerticalOffset={isIphoneX() ? 88 : 64}
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
      <SafeAreaView style={styles.container}>
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
            <View style={styles.content}>
              <ScrollView
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.scrollContentContainer}>
                <CustomInput
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  placeholder={translate('txtInputName')}
                  textContentType="name"
                />
                {/**Name input error */}
                {errors.name && touched.name && (
                  <View style={styles.errorContent}>
                    {!!errors?.name && <TextError message={errors?.name} />}
                  </View>
                )}

                <CustomInput
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
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder={translate('txtInputEmail')}
                  textContentType="emailAddress"
                />
                {/**Email input error */}
                {errors.email && touched.email && (
                  <View style={styles.errorContent}>
                    {!!errors?.email && <TextError message={errors?.email} />}
                  </View>
                )}

                <CustomInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder={translate('txtInputPassword')}
                  secureTextEntry={hidePassword}
                  textContentType="password"
                  blurOnSubmit={false}>
                  <ButtonVisiblePassword
                    onPress={visiblePasswordButtonPressed}
                    visible={hidePassword}
                  />
                </CustomInput>
                {/**Password input error */}
                {errors.password && touched.password && (
                  <View style={styles.errorContent}>
                    {!!errors?.password && (
                      <TextError message={errors?.password} />
                    )}
                  </View>
                )}

                <CustomInput
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder={translate('txtInputConfirmPassword')}
                  secureTextEntry={hidePassword}
                  textContentType="password"
                  blurOnSubmit={false}>
                  <ButtonVisiblePassword
                    onPress={visiblePasswordButtonPressed}
                    visible={hidePassword}
                  />
                </CustomInput>
                {/**Confirm password input error */}
                {errors.confirmPassword && (
                  <View style={styles.errorContent}>
                    {!!errors?.confirmPassword && (
                      <TextError message={errors?.confirmPassword} />
                    )}
                  </View>
                )}

                <CustomBirthdayPicker
                  onChangeDate={handleChange('birthday')}
                  defaultValue={values.birthday}
                  renderBase={() => (
                    <CustomInput
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
                  items={[
                    { label: translate('txtMale'), value: 1 },
                    { label: translate('txtFemale'), value: 0 },
                  ]}
                  placeholder={translate('txtPickerGender')}
                  defaultValue={values.gender}
                  onChangeItem={(item) => setFieldValue('gender', item.value)}
                />

                {/**Server response error */}
                {!_.isEmpty(signUpError) && (
                  <View style={styles.errorContent}>
                    {Object.values(signUpError).map((msg, index) => (
                      <TextError message={msg} key={index} />
                    ))}
                  </View>
                )}

                <View style={styles.textContent}>
                  <CustomCheckBox
                    value={values.privacyChecked}
                    onValueChange={() =>
                      setFieldValue('privacyChecked', !values.privacyChecked)
                    }
                  />
                  <Text style={styles.txtStyle}>{translate('txtPrivacy')}</Text>
                  <Text style={styles.txtStyleLink} onPress={() => {}}>
                    {translate('txtPrivacyLink')}
                  </Text>
                </View>

                {/**policy input error */}
                {errors.privacyChecked && (
                  <View style={styles.errorContent}>
                    {!!errors?.privacyChecked && (
                      <TextError message={errors?.privacyChecked} />
                    )}
                  </View>
                )}

                <View style={styles.textContent}>
                  <CustomCheckBox
                    value={values.publicMailChecked}
                    onValueChange={() =>
                      setFieldValue(
                        'publicMailChecked',
                        !values.publicMailChecked,
                      )
                    }
                  />
                  <Text style={styles.txtStyle}>
                    {translate('txtPrivacyMail')}
                  </Text>
                </View>

                <View style={styles.btnContent}>
                  <CustomButton
                    style={styles.btnStyle}
                    onPress={handleSubmit}
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
                    bgColor="#1976D2">
                    <Image
                      source={images.icons.ic_facebook}
                      style={styles.imgIconStyle}
                    />
                  </CustomButton>

                  <CustomButton
                    style={styles.btnStyle}
                    onPress={handleSubmit}
                    width={BUTTON_WIDTH}
                    height={BUTTON_HEIGHT}
                    label={translate('txtSignUpGoogle')}
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
                      style={styles.txtBoldStyleLink}
                      onPress={goSignInPage}>
                      {translate('txtSignIn')}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          )}
        </Formik>

        <PopupSignUpSuccess showModal={signUpSuccess} onPress={goSignInPage} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

// Layout message error
const TextError = ({ message }) => (
  <Text style={styles.txtErrorMessage}>{'* ' + message}</Text>
);

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

  content: {
    flex: 0,
    marginHorizontal: metrics.padding,
  },

  scrollContentContainer: {
    paddingVertical: 0,
  },

  // privacy
  textContent: {
    flexDirection: 'row',
    height: 23,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    margin: 10,
    marginTop: 30,
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
});

export default SignUpForm;
