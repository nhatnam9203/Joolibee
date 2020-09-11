import React from 'react';
import { Formik } from 'formik';
import { Button, View, TextInput } from 'react-native';
import { CustomInput } from '@components';

const SignInScreen = () => {
  return (
    <Formik
      initialValues={{ email: '' }}
      onSubmit={(values) => console.log(values)}>
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <CustomInput
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </View>
      )}
    </Formik>
  );
};

export default SignInScreen;
