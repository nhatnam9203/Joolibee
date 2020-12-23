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

const LAYOUT_WIDTH = '90%';

export const InputNewPassword = ({ phone = '' }, smsCode) => {
  const [, resetPasswordCustomer] = GEX.useResetPasswordCustomer();

  const NewPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, translate('txtTooShort'))
      .max(30, translate('txtTooLong'))
      .required(translate('txtRequired')),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], translate('txtPasswordMatch'))
      .min(6, translate('txtTooShort'))
      .max(30, translate('txtTooLong'))
      .required(translate('txtRequired')),
  });

  const forgotPasswordSubmit = (values) => {
    resetPasswordCustomer({ ...values, smsCode });
  };

  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.accent}>
      <Formik
        initialValues={{
          newPassword: '',
          confirmPassword: '',
          phoneNumber: phone,
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
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.newPassword}
              placeholder={translate('txtInputPassword')}
              textContentType="password"
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
