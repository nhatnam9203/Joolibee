import { useMutation } from '@apollo/client';
import {
  CustomBirthdayPicker,
  CustomButton,
  CustomInput,
  CustomModal,
  CustomModalTitle,
  CustomPickerSelect,
  CustomTextLink,
} from '@components';
import { GEX, GQL } from '@graphql';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { app, account } from '@slices';
import { AppStyles, images, metrics } from '@theme';
import { Formik } from 'formik';
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
import { format } from '@utils';
import { getUniqueId } from 'react-native-device-info';

const BUTTON_HEIGHT = 60;
const LAYOUT_WIDTH = '90%';
const HALF_LAYOUT_WIDTH = '42.5%';
const FULL_WIDTH = '100%';
const PROCESS_STATUS = {
  START: 1,
  SUCCESS: 2,
  FINISH: 3,
};
const REGEX_EMAIL = /^[^<>()[\]\\,;:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
export const SocialSigninForm = ({ infos: { phone = '', token }, smsCode }) => {
  const navigation = useNavigation();
  // redux
  const dispatch = useDispatch();

  // validate form
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, translate('txtTooShort'))
      .max(10, translate('txtTooLong')),
    lastname: Yup.string()
      .min(2, translate('txtTooShort'))
      .max(30, translate('txtTooLong')),
    email: Yup.string().matches(REGEX_EMAIL, translate('txtInvalidEmail')),
  });

  React.useEffect(() => {
    getCustomerInfo();
  }, [getCustomerInfo, token]);
  // state
  const [customerInfo, getCustomerInfo] = GEX.useCustomer();
  const [updateCustomerInfo] = useMutation(GQL.UPDATE_CUSTOMER);

  // const [showPopupSuccess, setShowPopupSuccess] = React.useState(
  //   PROCESS_STATUS.START,
  // );

  // function
  const signUpDataSubmit = async (formValues) => {
    await dispatch(app.showLoading());
    const variables = {
      ...formValues,
      smsCode,
      deviceId: getUniqueId(),
    };
    updateCustomerInfo({
      variables,
    })
      .then((data) => {
        Logger.debug(data, 'data?.data?.updateCustomerInfo');
        if (data?.data?.updateCustomerInfo) {
          dispatch(app.savePhoneVerify(''));
          dispatch(
            account.signInSucceed({
              token,
              phone_number: phone,
            }),
          );
        }
        dispatch(app.hideLoading());
      })
      .catch(() => {
        dispatch(app.hideLoading());
      });
  };

  // const goSignInPage = () => {
  //   setShowPopupSuccess(PROCESS_STATUS.FINISH);
  // };

  // React.useEffect(() => {
  //   if (registerCustomerResp?.data && !registerCustomerResp?.error) {
  //     const onSignupSucceed = async () => {
  //       await dispatch(account.signUpSucceeded(registerCustomerResp?.data));
  //       await dispatch(app.hideLoading());

  //       setShowPopupSuccess(PROCESS_STATUS.SUCCESS);
  //     };

  //     onSignupSucceed();
  //   }
  // }, [dispatch, registerCustomerResp]);

  // React.useEffect(() => {
  //   if (showPopupSuccess === PROCESS_STATUS.FINISH) {
  //     navigation.navigate(ScreenName.SignIn);
  //     setShowPopupSuccess(PROCESS_STATUS.START);
  //   }
  // }, [showPopupSuccess, navigation]);

  // render
  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.background}>
      <Formik
        initialValues={{
          email: customerInfo?.email ?? '',
          firstname: customerInfo?.firstname ?? '',
          lastname: customerInfo?.lastname ?? '',
          phoneNumber: phone,
          dob: new Date(),
          gender: 0,
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
                <View style={AppStyles.styles.horizontalLayout}>
                  <CustomInput
                    style={{
                      width: HALF_LAYOUT_WIDTH,
                      borderRadius: metrics.borderRadius,
                    }}
                    onChangeText={handleChange('firstname')}
                    onBlur={handleBlur('firstname')}
                    value={values.firstname}
                    placeholder={translate('txtInputFirstName')}
                    textContentType="name"
                    border
                  />

                  <CustomInput
                    style={{
                      width: HALF_LAYOUT_WIDTH,
                      borderRadius: metrics.borderRadius,
                    }}
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
                    placeholder={translate('txtInputLastName')}
                    textContentType="name"
                    border
                  />
                </View>

                {/**Name input error */}
                {errors.firstname && touched.firstname && (
                  <TextInputErrorMessage
                    style={{
                      width: LAYOUT_WIDTH,
                    }}
                    message={errors.firstname}
                    color={AppStyles.colors.inputError}
                  />
                )}

                <CustomInput
                  style={{
                    width: LAYOUT_WIDTH,
                    borderRadius: metrics.borderRadius,
                  }}
                  value={phone}
                  placeholder={translate('txtInputPhone')}
                  editable={false}
                  textContentType="telephoneNumber"
                  border>
                  <View style={styles.btnIcon}>
                    <Image
                      source={images.icons.ic_check_success}
                      style={styles.imgIconStyle}
                    />
                  </View>
                </CustomInput>

                <CustomInput
                  style={{
                    width: LAYOUT_WIDTH,
                    borderRadius: metrics.borderRadius,
                  }}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  placeholder={translate('txtInputEmail')}
                  textContentType="emailAddress"
                  border
                />
                {/**Email input error */}
                {errors.email && touched.email && (
                  <TextInputErrorMessage
                    style={{ width: LAYOUT_WIDTH }}
                    message={errors.email}
                    color={AppStyles.colors.inputError}
                  />
                )}

                <PasswordInput
                  style={{
                    width: LAYOUT_WIDTH,
                    borderRadius: metrics.borderRadius,
                  }}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  placeholder={translate('txtInputPassword')}
                  textContentType="password"
                  border
                />
                {/**Password input error */}
                {errors.password && touched.password && (
                  <TextInputErrorMessage
                    style={{ width: LAYOUT_WIDTH }}
                    message={errors.password}
                    color={AppStyles.colors.inputError}
                  />
                )}

                <PasswordInput
                  style={{
                    width: LAYOUT_WIDTH,
                    borderRadius: metrics.borderRadius,
                  }}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  placeholder={translate('txtInputConfirmPassword')}
                  textContentType="password"
                  border
                />
                {/**Confirm password input error */}
                {errors.confirmPassword && (
                  <TextInputErrorMessage
                    style={{
                      width: LAYOUT_WIDTH,
                      borderRadius: metrics.borderRadius,
                    }}
                    message={errors.confirmPassword}
                    color={AppStyles.colors.inputError}
                  />
                )}

                <View style={styles.pickerContentStyle}>
                  <CustomBirthdayPicker
                    onChangeDate={(d) => {
                      setFieldValue('dob', format.date(d));
                    }}
                    // defaultValue={values.dob}
                    value={values.dob}
                    renderBase={() => (
                      <CustomInput
                        style={{
                          width: FULL_WIDTH,
                          borderRadius: metrics.borderRadius,
                        }}
                        onBlur={handleBlur('dob')}
                        value={format.dateTime(values.dob).toString()}
                        placeholder={translate('txtPickerDate')}
                        pointerEvents="none"
                        border>
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
                    style={{
                      width: FULL_WIDTH,
                      borderRadius: metrics.borderRadius,
                    }}
                    items={[
                      { label: translate('txtMale'), value: 1, key: 'male' },
                      {
                        label: translate('txtFemale'),
                        value: 2,
                        key: 'female',
                      },
                      { label: translate('txtOther'), value: -1, key: 'other' },
                    ]}
                    placeholder={translate('txtPickerGender')}
                    defaultValue={values.gender}
                    useNativeAndroidPickerStyle={false}
                    onChangeItem={(item) => setFieldValue('gender', item)}
                    border
                  />
                </View>

                {/**Server response error */}
                {/* {!_.isEmpty(signUpError) &&
                  Object.values(signUpError).map((item, index) => (
                    <TextInputErrorMessage
                      style={{ width: LAYOUT_WIDTH }}
                      message={item}
                      color={AppStyles.colors.inputError}
                      key={index}
                    />
                  ))} */}

                {/* <View style={styles.checkBoxContent}>
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
                    style={styles.txtStyleLink}
                  />
                </View> */}

                {/**policy input error */}
                {/* {errors.privacyChecked && (
                  <TextInputErrorMessage
                    style={{ width: LAYOUT_WIDTH }}
                    message={errors.privacyChecked}
                    color={AppStyles.colors.inputError}
                  />
                )} */}

                {/* <View style={styles.checkBoxContent}>
                  <TextCheckBox
                    label={translate('txtPrivacyMail')}
                    value={values.is_subscribed}
                    onValueChange={() =>
                      setFieldValue('is_subscribed', !values.is_subscribed)
                    }
                    normalColor="#989898"
                  />
                </View> */}
              </View>

              <View style={styles.bottomContent}>
                {/**SIGN IN*/}
                <ButtonCC.ButtonRed
                  onPress={handleSubmit}
                  label={translate('txtSignUp')}
                />

                {/**FACEBOOK*/}
                {/* <ButtonCC.ButtonFacebook onPress={handleSubmit} /> */}

                {/**GOOGLE*/}
                {/* <ButtonCC.ButtonGoogle onPress={handleSubmit} /> */}

                {/**SIGN UP*/}
                {/* <View style={styles.textContent}>
                  <Text style={styles.txtStyle}>
                    {translate('txtHaveAccount')}
                  </Text>

                  <CustomTextLink
                    label={translate('txtSignIn')}
                    style={styles.txtBoldStyleLink}
                    onPress={goSignInPage}
                  />
                </View> */}
              </View>
            </View>
          </SafeAreaView>
        )}
      </Formik>

      {/* <PopupSignUpSuccess
        showModal={showPopupSuccess === PROCESS_STATUS.SUCCESS}
        onPress={goSignInPage}
        onToggle={() => setShowPopupSuccess(PROCESS_STATUS.FINISH)}
      /> */}
    </SinglePageLayout>
  );
};

// const POPUP_BUTTON_WIDTH = 200;
// const PopupSignUpSuccess = ({ onPress, showModal, onToggle }) => (
//   <CustomModal showModal={showModal} disableBackdrop onToggle={onToggle}>
//     <View style={styles.popup_container}>
//       <Image source={images.icons.ic_succeeded} />
//       <CustomModalTitle>{translate('txtSignupSuccess')}</CustomModalTitle>
//       <CustomButton
//         style={styles.btnStyle}
//         onPress={onPress}
//         width={POPUP_BUTTON_WIDTH}
//         height={BUTTON_HEIGHT}
//         label={translate('txtSignIn')}
//         borderColor={AppStyles.colors.button}
//         textColor={AppStyles.colors.text}
//         bgColor={AppStyles.colors.button}
//       />
//     </View>
//   </CustomModal>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },

  popup_container: {
    flex: 0,
    width: '90%',
    maxHeight: '90%',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },

  topContent: {
    alignItems: 'center',
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
    zIndex: 1,
  },

  txtStyle: {
    ...AppStyles.fonts.text,
    marginLeft: 5,
  },

  txtStyleLink: {
    ...AppStyles.fonts.text,
    color: '#0696F8',
    marginLeft: 5,
  },

  txtBoldStyleLink: {
    ...AppStyles.fonts.bold,
    color: '#0696F8',
    marginLeft: 5,
  },

  bottomContent: {
    marginBottom: 10,
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

  pickerContentStyle: {
    width: LAYOUT_WIDTH,
    alignItems: 'center',
    marginBottom: 10,
  },
});
