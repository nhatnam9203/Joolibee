import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import { useMutation } from '@apollo/client';
import { GQL } from '@graphql';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ButtonCC, PasswordInput, TextInputErrorMessage } from '../components';
import { CustomImageBackground } from '@components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { app } from '@slices';
import { useNavigation } from '@react-navigation/native';
const LAYOUT_WIDTH = '90%';

const ChangePasswordScreen = () => {
  const [changeCustomerPassword] = useMutation(GQL.CHANGE_PASSWORD);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onHandleSubmit = React.useCallback(
    (values) => {
      dispatch(app.showLoading());
      changeCustomerPassword({
        variables: {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        },
      })
        .then(() => {
          dispatch(app.hideLoading());
          navigation.goBack();
        })
        .catch(() => {
          dispatch(app.hideLoading());
        });
    },
    [dispatch, changeCustomerPassword, navigation],
  );

  const EditSchema = Yup.object().shape({
    currentPassword: Yup.string().required(translate('txtRequired')),
    newPassword: Yup.string()
      .min(6, translate('txtTooShort'))
      .max(30, translate('txtTooLong'))
      .required(translate('txtRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword')], translate('txtPasswordMatch'))
      .min(6, translate('txtTooShort'))
      .max(30, translate('txtTooLong'))
      .required(translate('txtRequired')),
  });
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: EditSchema,
    isValidating: true,
    onSubmit: onHandleSubmit,
  });
  return (
    <CustomImageBackground
      style={{ flex: 1 }}
      source={images.watermark_background_2}>
      <SinglePageLayout>
        <SafeAreaView>
          <View style={styles.container}>
            <PasswordInput
              style={{ width: LAYOUT_WIDTH }}
              onChangeText={handleChange('currentPassword')}
              onBlur={handleBlur('currentPassword')}
              value={values.currentPassword}
              placeholder={translate('txtInputOldPassword')}
              textContentType="password"
            />
            {errors.currentPassword && touched.currentPassword && (
              <TextInputErrorMessage
                style={{ width: LAYOUT_WIDTH }}
                message={errors.currentPassword}
                color={AppStyles.colors.inputError}
              />
            )}
            <PasswordInput
              style={{ width: LAYOUT_WIDTH }}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('newPassword')}
              value={values.newPassword}
              placeholder={translate('txtInputNewPassword')}
              textContentType="password"
            />
            {errors.newPassword && touched.newPassword && (
              <TextInputErrorMessage
                style={{ width: LAYOUT_WIDTH }}
                message={errors.newPassword}
                color={AppStyles.colors.inputError}
              />
            )}
            <PasswordInput
              style={{ width: LAYOUT_WIDTH }}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              placeholder={translate('txtInputConfirmNewPassword')}
              textContentType="password"
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <TextInputErrorMessage
                style={{ width: LAYOUT_WIDTH }}
                message={errors.confirmPassword}
                color={AppStyles.colors.inputError}
              />
            )}

            <ButtonCC.ButtonYellow
              label={translate('txtSavePassword')}
              onPress={handleSubmit}
            />
          </View>
        </SafeAreaView>
      </SinglePageLayout>
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: 'transparent' },

  pickerContentStyle: {
    width: LAYOUT_WIDTH,
    alignItems: 'center',
    marginBottom: 50,
  },
});

export default ChangePasswordScreen;
