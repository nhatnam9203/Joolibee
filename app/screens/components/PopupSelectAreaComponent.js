import React from 'react';
import { StyleSheet, Image, View, Dimensions, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { CustomPickerSelect, CustomButton } from '@components';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import { translate } from '@localize';
import { JollibeeLogo } from '../components';
import { PopupLayout } from '@layouts';
import { useSelector } from 'react-redux';

const { scaleWidth, scaleHeight } = scale;
export const PopupSelectAreaComponent = ({ visible, onToggle }) => {
  const popupRef = React.createRef(null);
  const init_location = useSelector((state) => state.store.init_location);
  const [city, setCity] = React.useState(-1);
  const [district, setDistrict] = React.useState(-1)



  const onChangeItem = React.useCallback((type, value) => () => {
    switch (type) {
      case 'city':
        setCity(value)
        break;

      default:
        setDistrict(value)
        break;
    }
  }, []);

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <View style={styles.container}>

        <ScrollView >
          <View style={styles.content_top}>
            <JollibeeLogo style={styles.icon_jollibee} />

            <Text style={[AppStyles.fonts.title, styles.txtTitle]}>
              {translate('txtSelectCity')}
            </Text>

            <CustomPickerSelect
              items={[
                { label: 'Tp. Hồ Chí Minh', value: 1 },
                { label: 'Hà Nội', value: 0 },
              ]}
              placeholder={translate('txtSelectDistrict')}
              defaultValue={city}
              onChangeItem={(item) => onChangeItem('city', item?.value)}
            />
            <CustomPickerSelect
              items={[
                { label: 'Quận 1', value: 1 },
                { label: 'Quận 2', value: 0 },
              ]}
              placeholder={translate('txtSelectWard')}
              defaultValue={district}
              onChangeItem={(item) => onChangeItem('district', item?.value)}
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
              onPress={() => popupRef.current.forceQuit()}
              label={translate('txtButtonConfirm')}
              width={181}
              height={58}
              bgColor={AppStyles.colors.accent}
              textColor={AppStyles.colors.background}
              style={{
                marginVertical: scaleHeight(10),
              }}
            />

            <Text
              numberOfLines={3}
              style={[AppStyles.fonts.text, styles.txtNote]}>
              {
                '*Chúng tôi chưa phục vụ giao hàng tận nơi tại những khu vực nằm ngoài danh sách trên, mong quý khách thông cảm'
              }
            </Text>
          </View>
        </ScrollView>
      </View>
    </PopupLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '85%',
    backgroundColor: AppStyles.colors.button,
    borderRadius: 8,
    overflow: 'hidden',
  },
  content_top: {
    width: '100%',
    // height: '60%',
    backgroundColor: AppStyles.colors.accent,
    alignItems: 'center',
    paddingHorizontal: scaleWidth(15),
    paddingTop: scaleHeight(25),
  },
  content_bottom: {
    lineHeight: 21,
    paddingHorizontal: scaleWidth(22),
    paddingTop: scaleHeight(25),
    alignItems: 'center',
    marginTop: 20,
    height: '25%',
  },
  polygonStyle: {
    position: 'absolute',
    bottom: -32,
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
  txtTitle: {
    fontSize: scaleWidth(24),
    marginTop: scaleHeight(15),
    color: AppStyles.colors.white,
    textAlign: 'center',
  },
  icon_jollibee: {
    resizeMode: 'contain',
    width: scaleWidth(126),
    height: scaleHeight(126),
  },
});
