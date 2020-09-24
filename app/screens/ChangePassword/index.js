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
import { ButtonCC } from '../components';

const LAYOUT_WIDTH = '90%';
const FULL_WIDTH = '100%';

const ChangePasswordScreen = () => {
  return (
    <SinglePageLayout backgroundColor={AppStyles.colors.background}>
      <SafeAreaView>
        <View style={styles.container}>
          <CustomInput
            style={{ width: LAYOUT_WIDTH }}
            placeholder={translate('txtInputName')}
            textContentType="name"
          />

          <CustomInput
            style={{ width: LAYOUT_WIDTH }}
            placeholder={translate('txtInputPhone')}
            editable={false}
            textContentType="telephoneNumber"
          />

          <CustomInput
            style={{ width: LAYOUT_WIDTH }}
            // onChangeText={handleChange('email')}
            // onBlur={handleBlur('email')}
            // value={values.email}
            placeholder={translate('txtInputEmail')}
            textContentType="emailAddress"
          />

          <View style={styles.pickerContentStyle}>
            <CustomBirthdayPicker
              //   onChangeDate={handleChange('birthday')}
              //   defaultValue={values.birthday}
              renderBase={() => (
                <CustomInput
                  style={{ width: FULL_WIDTH }}
                  //   onBlur={handleBlur('birthday')}
                  //   value={values.birthday}
                  placeholder={translate('txtPickerDate')}
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
              items={[
                { label: translate('txtMale'), value: 1 },
                { label: translate('txtFemale'), value: 0 },
              ]}
              placeholder={translate('txtPickerGender')}
              //   defaultValue={values.gender}
              //   onChangeItem={(item) => setFieldValue('gender', item.value)}
            />
          </View>

          <ButtonCC.ButtonYellow label={translate('txtUpdate')} />
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
