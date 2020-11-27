import {
  CustomBirthdayPicker,
  CustomInput,
  CustomPickerSelect,
} from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import { useMutation } from '@apollo/client';
import { mutation } from '@graphql';
import { app, account } from '@slices';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { ButtonCC, TextInputErrorMessage, PasswordInput } from '../components';
const LAYOUT_WIDTH = '90%';
const FULL_WIDTH = '100%';
const HALF_LAYOUT_WIDTH = '42.5%';
const EditAccountScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.account?.user?.profile);
  const { email, firstname, lastname, phone_number, gender, date_of_birth } =
    user || {};
  const [updateCustomerInfo] = useMutation(mutation.UPDATE_CUSTOMER);

  const EditSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(2, translate('txtTooShort'))
      .max(10, translate('txtTooLong')),
    lastname: Yup.string()
      .min(2, translate('txtTooShort'))
      .max(30, translate('txtTooLong')),
  });

  const onHandleSubmit = React.useCallback(
    (values) => {
      dispatch(app.showLoading());
      updateCustomerInfo({ variables: values })
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
      phone_number,
      gender,
      date_of_birth,
      password: '',
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
            style={{ width: LAYOUT_WIDTH, opacity: 0.4 }}
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            placeholder={translate('txtInputEmail')}
            textContentType="emailAddress"
            border
            editable={false}
          />
          {/**Email input error */}
          {errors.email && touched.email && (
            <TextInputErrorMessage
              style={{ width: LAYOUT_WIDTH }}
              message={errors.email}
              color={AppStyles.colors.inputError}
            />
          )}
          <View style={styles.pickerContentStyle}>
            <CustomBirthdayPicker
              onChangeDate={handleChange('date_of_birth')}
              defaultValue={values.date_of_birth}
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
