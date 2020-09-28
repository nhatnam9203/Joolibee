import React from 'react';
import { StyleSheet, Image, View, Dimensions } from 'react-native';
import { Text } from 'react-native-paper';
import { CustomModal, CustomPickerSelect, CustomButton } from '@components';
import { AppStyles, images } from '@theme';
import { translate } from '@localize';
import { JollibeeLogo, LabelTitle } from '.';

const { width, height } = Dimensions.get('window');
export const PopupSelectAreaComponent = ({ visible, onToggle }) => {
  return (
    <CustomModal.CustomModal showModal={visible}>
      <View style={styles.container}>
        <View style={styles.content_top}>
          <JollibeeLogo />
          <LabelTitle label={translate('txtSelectCity')} />
          <CustomPickerSelect
            items={[
              { label: 'Tp. Hồ Chí Minh', value: 1 },
              { label: 'Hà Nội', value: 0 },
            ]}
            placeholder={translate('txtSelectDistrict')}
            defaultValue={1}
            // onChangeItem={(item) => setFieldValue('gender', item.value)}
          />
          <CustomPickerSelect
            items={[
              { label: 'Quận 1', value: 1 },
              { label: 'Quận 2', value: 0 },
            ]}
            placeholder={translate('txtSelectWard')}
            defaultValue={1}
            // onChangeItem={(item) => setFieldValue('gender', item.value)}
          />

          <View style={styles.polygonStyle}>
            <Image source={images.login_polygon} />
          </View>
        </View>

        <View style={styles.content_bottom}>
          <View style={styles.content_price}>
            <Text style={AppStyles.fonts.text}>
              {translate('txtMiniMumOrder')}
            </Text>

            <Text
              style={[
                AppStyles.fonts.title,
                { color: AppStyles.colors.text, marginLeft: 15 },
              ]}>
              60.000 đ
            </Text>
          </View>

          <CustomButton
            onPress={onToggle}
            label={translate('txtButtonConfirm')}
            width={181}
            height={58}
            bgColor={AppStyles.colors.accent}
            textColor={AppStyles.colors.background}
            style={{
              marginVertical: 20,
            }}
          />

          <Text
            numberOfLines={3}
            style={[AppStyles.fonts.text, styles.txtNote]}>
            {
              '*Chúng tôi chưa phục vụ giao hàng tận nơi\n tại những khu vực nằm ngoài danh sách trên,\n mong quý khách thông cảm'
            }
          </Text>
        </View>
      </View>
    </CustomModal.CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.7,
    backgroundColor: AppStyles.colors.button,
    borderRadius: 8,
    overflow: 'hidden',
  },
  content_top: {
    width: '100%',
    height: '60%',
    backgroundColor: AppStyles.colors.accent,
    alignItems: 'center',
    paddingHorizontal: 22,
    paddingTop: 25,
  },
  content_bottom: {
    lineHeight: 21,
    padding: width * 0.05,
    alignItems: 'center',
  },
  polygonStyle: {
    position: 'absolute',
    bottom: -25,
    left: 0,
    right: 0,
    flex: 0,
    alignItems: 'center',
  },
  content_price: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtNote: {
    textAlign: 'center',
    lineHeight: 21,
  },
});
