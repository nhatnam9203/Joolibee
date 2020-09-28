import {
  CustomBirthdayPicker,
  CustomInput,
  CustomPickerSelect,
} from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';
import { ButtonCC, PasswordInput } from '../components';

const LAYOUT_WIDTH = '90%';
const FULL_WIDTH = '100%';

const ChangePasswordScreen = () => {
  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.background}>
      <SafeAreaView>
        <View style={styles.container}>
          <PasswordInput
            style={{ width: LAYOUT_WIDTH }}
            // onChangeText={handleChange('password')}
            // onBlur={handleBlur('password')}
            // value={values.password}
            placeholder={translate('txtInputOldPassword')}
            textContentType="password"
          />
          <PasswordInput
            style={{ width: LAYOUT_WIDTH }}
            // onChangeText={handleChange('password')}
            // onBlur={handleBlur('password')}
            // value={values.password}
            placeholder={translate('txtInputNewPassword')}
            textContentType="password"
          />
          <PasswordInput
            style={{ width: LAYOUT_WIDTH }}
            // onChangeText={handleChange('password')}
            // onBlur={handleBlur('password')}
            // value={values.password}
            placeholder={translate('txtInputConfirmNewPassword')}
            textContentType="password"
          />

          <ButtonCC.ButtonYellow label={translate('txtSavePassword')} />
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

export default ChangePasswordScreen;
