import {
  CustomBirthdayPicker,
  CustomInput,
  CustomPickerSelect,
} from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import { useMutation } from '@apollo/client';
import { GQL } from '@graphql';
import { app, account } from '@slices';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ButtonCC, TextInputErrorMessage, PasswordInput } from '../components';
import { format } from '@utils';
import { getUniqueId } from 'react-native-device-info';
const REGEX_EMAIL = /^[^<>()[\]\\,;:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
const LAYOUT_WIDTH = '90%';
const FULL_WIDTH = '100%';
const HALF_LAYOUT_WIDTH = '42.5%';
const DATE_FORMAT = 'YYYY/MM/DD';
const EditAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { phone_number, profile } = useSelector((state) => state.account?.user);
  const { email, firstname, lastname, gender, date_of_birth } = profile || {};

  const [updateCustomerInfo] = useMutation(GQL.UPDATE_CUSTOMER);

  const EditSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, translate('txtTooShort'))
      .max(10, translate('txtTooLong')),
    lastname: Yup.string()
      .min(2, translate('txtTooShort'))
      .max(30, translate('txtTooLong')),
    // password: Yup.string().required(translate('txtRequired')),
    email: Yup.string().matches(REGEX_EMAIL, translate('txtInvalidEmail')),
  });

  const onHandleSubmit = React.useCallback(
    (values) => {
      dispatch(app.showLoading());
      updateCustomerInfo({
        variables: {
          ...values,
          // deviceId: getUniqueId(),
          gender: values.gender === -1 ? null : values.gender,
        },
        // awaitRefetchQueries
      })
        .then((data) => {
          if (data?.data?.updateCustomerInfo) {
            dispatch(account.saveUserInfo(data?.data?.updateCustomerInfo));
            navigation.goBack();
          }
          dispatch(app.hideLoading());
        })
        .catch(() => {
          dispatch(app.hideLoading());
        });
    },
    [dispatch, navigation, updateCustomerInfo],
  );
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email,
      firstname,
      lastname,
      // phone_number,
      gender: gender ? gender : -1,
      date_of_birth: format.dateTime(date_of_birth, DATE_FORMAT),
      // password: '',
    },
    validationSchema: EditSchema,
    isValidating: true,
    onSubmit: onHandleSubmit,
  });
  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.background}>
      <SafeAreaView>
        <View style={styles.container}>
          <View style={AppStyles.styles.horizontalLayout}>
            <CustomInput
              style={{ width: HALF_LAYOUT_WIDTH }}
              placeholder={translate('txtInputFirstName')}
              textContentType="name"
              value={values.firstname}
              onChangeText={handleChange('firstname')}
              onBlur={handleBlur('firstname')}
              border
            />

            <CustomInput
              style={{ width: HALF_LAYOUT_WIDTH }}
              placeholder={translate('txtInputLastName')}
              textContentType="name"
              value={values.lastname}
              onChangeText={handleChange('lastname')}
              onBlur={handleBlur('lastname')}
              border
            />
          </View>
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
            style={{ width: LAYOUT_WIDTH, opacity: 0.4 }}
            placeholder={translate('txtInputPhone')}
            border
            editable={false}
            textContentType="telephoneNumber"
            value={phone_number}
          />
          <CustomInput
            style={{ width: LAYOUT_WIDTH }}
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

          {/* <PasswordInput
            style={{ width: LAYOUT_WIDTH }}
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            placeholder={translate('txtInputCurrentPassword')}
            textContentType="password"
          />
          {errors.password && touched.password && (
            <TextInputErrorMessage
              style={{ width: LAYOUT_WIDTH }}
              message={errors.password}
              color={AppStyles.colors.inputError}
            />
          )} */}
          <View style={styles.pickerContentStyle}>
            <CustomBirthdayPicker
              onChangeDate={handleChange('date_of_birth')}
              // defaultValue={values.date_of_birth}
              fmDate={DATE_FORMAT}
              renderBase={() => (
                <CustomInput
                  style={{ width: FULL_WIDTH }}
                  //   onBlur={handleBlur('birthday')}
                  value={values.date_of_birth}
                  placeholder={translate('txtPickerDate')}
                  border
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
              border
              items={[
                { label: translate('txtMale'), value: 1 },
                { label: translate('txtFemale'), value: 2 },
                { label: translate('txtOther'), value: -1, key: 'other' },
              ]}
              placeholder={translate('txtPickerGender')}
              value={values.gender}
              onChangeItem={(item) => {
                setFieldValue('gender', item);
              }}
            />
          </View>
          <ButtonCC.ButtonYellow
            label={translate('txtUpdate')}
            onPress={handleSubmit}
          />
        </View>
      </SafeAreaView>
    </SinglePageLayout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },

  pickerContentStyle: {
    width: LAYOUT_WIDTH,
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default EditAccountScreen;
