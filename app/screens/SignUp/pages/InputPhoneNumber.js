import { CustomInput } from '@components';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import { ButtonCC, LabelTitle, TextInputErrorMessage } from '../../components';
import { SinglePageLayout } from '@layouts';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { regex } from '@utils';

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
      Logger.log(values, 'inputPhoneDataSubmit');
      // const action = signUp(values, { dispatch });
      // dispatch(action);
      next(values);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch],
  );

  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.accent}>
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
          setFieldValue,
        }) => (
          <SafeAreaView>
            <View style={styles.container}>
              <LabelTitle label={translate('txtInputPhoneNumber')} />

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
  btnStyle: { marginTop: 50, width: '50%' },
});
