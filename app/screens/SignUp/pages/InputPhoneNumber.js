import { CustomInput } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { hideLoading, showLoading } from '@slices/app';
import { AppStyles } from '@theme';
import { regex } from '@utils';
import { Formik } from 'formik';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { ButtonCC, LabelTitle, TextInputErrorMessage } from '../../components';

const LAYOUT_WIDTH = '90%';

export const InputPhoneNumber = ({ next }) => {
  const dispatch = useDispatch();

  // validate form
  const InputPhoneSchema = Yup.object().shape({
    phone: Yup.string()
      .required(translate('txtRequired'))
      .matches(regex.phone, translate('txtWrongPhoneNumber'))
      .min(10, translate('txtTooShort'))
      .max(15, translate('txtTooLong')),
  });

  const inputPhoneDataSubmit = React.useCallback(
    (values) => {
      next(values);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [next],
  );

  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.accent} bounces={false}>
      <Formik
        initialValues={{
          phone: '',
        }}
        onSubmit={inputPhoneDataSubmit}
        validationSchema={InputPhoneSchema}
        isValidating={true}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <SafeAreaView>
            <View style={styles.container}>
              <LabelTitle
                label={translate('txtInputPhoneNumber')}
                color="#fff"
              />

              {/**PHONE*/}
              <CustomInput
                style={{ width: LAYOUT_WIDTH }}
                onChangeText={handleChange('phone')}
                onBlur={handleBlur('phone')}
                value={values.phone}
                placeholder={translate('txtInputPhoneNumberPlaceholder')}
                textContentType="telephoneNumber"
                keyboardType="phone-pad"
              />

              {/**Phone input error */}
              {errors.phone && touched.phone && (
                <TextInputErrorMessage
                  style={{ width: LAYOUT_WIDTH }}
                  message={errors.phone}
                  color={AppStyles.colors.inputError}
                />
              )}

              <ButtonCC.ButtonYellow
                onPress={handleSubmit}
                label={translate('txtContinue')}
                style={styles.btnStyle}
              />
            </View>
          </SafeAreaView>
        )}
      </Formik>
    </SinglePageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnStyle: { marginTop: 80, width: '65%' },
});
