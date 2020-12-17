import { CustomInput } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import { regex } from '@utils';
import { Formik } from 'formik';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import * as Yup from 'yup';
import { ButtonCC, LabelTitle, TextInputErrorMessage } from '../../components';
import { useSelector } from 'react-redux';
const LAYOUT_WIDTH = '90%';

export const InputPhoneNumber = ({ next }) => {
  // validate form
  const phone_number = useSelector((state) => state.app?.phone_verify);
  const InputPhoneSchema = Yup.object().shape({
    phone: Yup.string()
      .required(translate('txtRequired'))
      .matches(regex.phone, translate('txtWrongPhoneNumber'))
      .length(10, translate('txtWrongPhoneNumber')),
  });

  const inputPhoneDataSubmit = React.useCallback(
    (values) => {
      next(values);
    },
    [next],
  );

  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.accent} bounces={false}>
      <Formik
        initialValues={{
          phone: phone_number ?? '',
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
  textHighlightStyle: {
    ...AppStyles.fonts.text,
    color: AppStyles.colors.button,
    textAlign: 'center',
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  btnStyle: { marginTop: 80, width: '65%' },
});
