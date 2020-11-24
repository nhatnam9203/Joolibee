import React from 'react';
import { StyleSheet, Image, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import { CustomPickerSelect, CustomButton } from '@components';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import { translate } from '@localize';
import { JollibeeLogo } from '../components';
import {
  PopupLayout,
  AppScrollViewIOSBounceColorsWrapper,
  SinglePageLayout,
} from '@layouts';
import { useSelector, useDispatch } from 'react-redux';
import { store } from '@slices';

const { scaleWidth, scaleHeight } = scale;
export const PopupSelectAreaComponent = ({ visible, onToggle }) => {
  const dispatch = useDispatch();
  const popupRef = React.createRef(null);
  const init_location = useSelector((state) => state.store.init_location);
  const cities = useSelector((state) => state.store.cities);
  const districts = useSelector((state) => state.store.districts);

  const [city, setCity] = React.useState(-1);
  const [district, setDistrict] = React.useState(-1);

  React.useEffect(() => {
    setCity(init_location?.default_city);
    setDistrict(init_location?.default_district);
  }, [init_location.default_city, init_location.default_district]);

  const onHandleChangeCity = React.useCallback(
    (value) => {
      let indexCity = cities.findIndex((item) => item.value === value);
      setCity(indexCity);
      dispatch(store.filterDistrictByCity({ key: cities[indexCity]?.label }));
    },
    [cities, dispatch],
  );

  const onHandleChangeDistrict = React.useCallback(
    (value) => {
      let indexDistrict = districts.findIndex((item) => item.value === value);
      setDistrict(indexDistrict);
    },
    [districts],
  );

  const onChangeItem = React.useCallback(
    (type, value) => {
      console.log('value', value);
      switch (type) {
        case 'city':
          onHandleChangeCity(value);
          break;

        default:
          onHandleChangeDistrict(value);
          break;
      }
    },
    [onHandleChangeCity, onHandleChangeDistrict],
  );

  const onHandleSubmit = () => {
    let _city = cities[city]?.label;
    let _district = districts[district]?.label;
    let update_location = {
      ...init_location,
      city: _city,
      district: _district,
    };
    dispatch(store.setInitLocation(update_location));
    popupRef.current.forceQuit();
  };

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <AppScrollViewIOSBounceColorsWrapper
        topBounceColor={AppStyles.colors.accent}
        bottomBounceColor={AppStyles.colors.button}
        style={styles.container}>
        <ScrollView>
          <View style={styles.content_top}>
            <JollibeeLogo style={styles.icon_jollibee} />

            <Text style={styles.txtTitle}>{translate('txtSelectCity')}</Text>

            <CustomPickerSelect
              items={cities}
              placeholder={translate('txtSelectDistrict')}
              value={city}
              onChangeItem={(item) => onChangeItem('city', item)}
            />
            <CustomPickerSelect
              items={districts}
              placeholder={translate('txtSelectWard')}
              value={district}
              onChangeItem={(item) => onChangeItem('district', item)}
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

              <Text style={styles.txtPrice}>60.000 đ</Text>
            </View>

            <CustomButton
              onPress={onHandleSubmit}
              label={translate('txtButtonConfirm')}
              width={181}
              height={58}
              bgColor={AppStyles.colors.accent}
              textColor={AppStyles.colors.background}
              style={{
                marginVertical: scaleHeight(10),
              }}
            />

            <Text numberOfLines={3} style={styles.txtNote}>
              {
                '*Chúng tôi chưa phục vụ giao hàng tận nơi tại những khu vực nằm ngoài danh sách trên, mong quý khách thông cảm'
              }
            </Text>
          </View>
        </ScrollView>
      </AppScrollViewIOSBounceColorsWrapper>
    </PopupLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: AppStyles.colors.button,
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: scaleHeight(25),
  },
  content_top: {
    width: '100%',
    // height: '60%',
    //backgroundColor: AppStyles.colors.accent,
    alignItems: 'center',
    paddingHorizontal: scaleWidth(15),
  },
  content_bottom: {
    lineHeight: 21,
    paddingHorizontal: scaleWidth(22),
    paddingTop: scaleHeight(25),
    alignItems: 'center',
    marginTop: 20,
    height: scaleHeight(245),
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
    ...AppStyles.fonts.text,
    fontSize: scaleWidth(16),
    textAlign: 'center',
    lineHeight: 21,
  },
  txtTitle: {
    ...AppStyles.fonts.title,
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
  txtPrice: {
    ...AppStyles.fonts.title,
    fontSize: scaleWidth(28),
    color: AppStyles.colors.text,
    marginLeft: 15,
  },
});
