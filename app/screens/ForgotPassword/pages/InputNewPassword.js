import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  PasswordInput,
  LabelTitle,
  TextInputErrorMessage,
  ButtonCC,
} from '../../components';
import { SinglePageLayout } from '@layouts';
import { Formik } from 'formik';
import _ from 'lodash';
import * as Yup from 'yup';
import { GEX } from '@graphql';
import { useNavigation } from '@react-navigation/native';

const LAYOUT_WIDTH = '90%';

export const InputNewPassword = ({ infos, smsCode }) => {
  const navigation = useNavigation();
  const [, resetPasswordCustomer] = GEX.useResetPasswordCustomer();

  const NewPasswordSchema = Yup.object().shape({
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

  const forgotPasswordSubmit = (values) => {
    let variables = {
      newPassword: values.newPassword,
      phoneNumber: infos?.phone,
      smsCode,
    };
    resetPasswordCustomer({ variables }).then(({ data }) => {
      if (data?.resetPassword) {
        navigation.goBack();
      }
    });
  };

  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.accent}>
      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: '',
        }}
        onSubmit={forgotPasswordSubmit}
        validationSchema={NewPasswordSchema}
        isValidating={true}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.container}>
            <LabelTitle label={translate('txtNewPassword')} color="#fff" />

            <PasswordInput
              style={{ width: LAYOUT_WIDTH }}
              onChangeText={handleChange('newPassword')}
              onBlur={handleBlur('password')}
              value={values.newPassword}
              placeholder={translate('txtInputPassword')}
              textContentType="password"
            />
            {/**Password input error */}
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
              placeholder={translate('txtInputConfirmPassword')}
              textContentType="password"
            />
            {/**Confirm password input error */}
            {errors.confirmPassword && (
              <TextInputErrorMessage
                style={{ width: LAYOUT_WIDTH }}
                message={errors.confirmPassword}
                color={AppStyles.colors.inputError}
              />
            )}
            <ButtonCC.ButtonYellow
              onPress={handleSubmit}
              label={translate('txtSave')}
              style={styles.btnStyle}
            />
          </View>
        )}
      </Formik>
    </SinglePageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  btnStyle: { marginTop: 50, width: '50%' },
});
