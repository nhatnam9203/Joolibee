import {
  CustomButton,
  CustomInput,
  CustomCheckBox,
  CustomPickerSelect,
  CustomBirthdayPicker,
} from '@components';
import { translate } from '@localize';
import { showLoading } from '@slices/app';
import { AppStyles, metrics, images } from '@theme';
import { Formik } from 'formik';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { isIphoneX } from '../../lib/isIphoneX';
import * as Yup from 'yup';

const BUTTON_HEIGHT = 60;
const BUTTON_WIDTH = '98%';

const SignUpScreen = () => {
  const dispatch = useDispatch();
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, translate('txtTooShort'))
      .max(50, translate('txtTooShort'))
      .required(translate('txtRequired')),
    email: Yup.string()
      .email(translate('txtInvalidEmail'))
      .required('Required'),
  });
  const [hidePassword, setHidePassword] = React.useState(true);

  const signUpButtonPressed = React.useCallback(() => {
    const action = showLoading();
    dispatch(action);
  }, [dispatch]);

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
          onSubmit={(values) => console.log('submit ---------', values)}
          validationSchema={SignupSchema}
          isValidating={true}
          isSubmitting={true}>
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
                />
                {/**Input name error */}
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
                  editable={false}>
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
                />

                <CustomInput
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder={translate('txtInputPassword')}
                  secureTextEntry={hidePassword}>
                  <TouchableOpacity style={styles.btnIcon} onPress={() => {}}>
                    <Image
                      source={images.icons.ic_hide_password}
                      style={styles.imgIconStyle}
                    />
                  </TouchableOpacity>
                </CustomInput>

                <CustomInput
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder={translate('txtInputConfirmPassword')}
                  secureTextEntry={hidePassword}>
                  <Image
                    source={images.icons.ic_hide_password}
                    style={styles.imgIconStyle}
                  />
                </CustomInput>

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

                <View style={styles.textContent}>
                  <CustomCheckBox />
                  <Text style={styles.txtStyle}>{translate('txtPrivacy')}</Text>
                  <Text style={styles.txtStyleLink} onPress={() => {}}>
                    {translate('txtPrivacyLink')}
                  </Text>
                </View>

                <View style={styles.textContent}>
                  <CustomCheckBox />
                  <Text style={styles.txtStyle}>
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

                  <View style={styles.textContent}>
                    <Text style={styles.txtStyle}>
                      {translate('txtHaveAccount')}
                    </Text>
                    <Text style={styles.txtBoldStyleLink} onPress={() => {}}>
                      {translate('txtSignIn')}
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const TextError = ({ message }) => (
  <Text style={styles.txtErrorMessage}>{'· ' + message}</Text>
);

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

export default SignUpScreen;
