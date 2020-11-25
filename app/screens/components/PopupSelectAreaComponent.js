import { CustomButton, CustomPickerSelect } from '@components';
import { AppScrollViewIOSBounceColorsWrapper, PopupLayout } from '@layouts';
import { translate } from '@localize';
import { store } from '@slices';
import { AppStyles, images } from '@theme';
import { appUtil, scale } from '@utils';
import _ from 'lodash';
import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { JollibeeLogo } from '../components';

const { scaleWidth, scaleHeight } = scale;
export const PopupSelectAreaComponent = ({ visible, onToggle }) => {
  const dispatch = useDispatch();
  const popupRef = React.createRef(null);

  const init_location = useSelector((state) => state.store.init_location);
  const storesList = useSelector((state) => state.store.default.stores);

  const cities = appUtil.getCitiesList(storesList);

  const [city, setCity] = React.useState(init_location.default_city);
  const [district, setDistrict] = React.useState(
    init_location?.default_district,
  );

  const filterDistrict = React.useCallback(() => {
    let list = [];
    if (city !== null) {
      list = appUtil.getDistrictInCity(storesList, city);
    }
    return list;
  }, [city, storesList]);

  const onHandleChangeCity = (value) => {
    if (value !== null) {
      setCity(value);
      setDistrict(null);
    } else {
      setCity(null);
    }
  };

  const onHandleChangeDistrict = (value) => {
    if (value !== null) {
      setDistrict(value);
    }
  };

  const onHandleSubmit = () => {
    if (city && district) {
      let update_location = {
        ...init_location,
        cityId: city,
        districtId: district,
      };
      dispatch(store.pickMyLocations(update_location));
      popupRef.current.forceQuit();
    } else {
      // !!show dialog yeu cau chon khu vuc, hoac turn on allow location
    }
  };

  return (
    <PopupLayout
      visible={visible}
      onToggle={onToggle}
      ref={popupRef}
      disableBackdrop={true}>
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
              placeholder={translate('txtSelectWard')}
              onChangeItem={onHandleChangeCity}
            />

            <CustomPickerSelect
              items={filterDistrict()}
              placeholder={translate('txtSelectDistrict')}
              onChangeItem={onHandleChangeDistrict}
              value={district}
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
              width={scaleWidth(181)}
              height={scaleHeight(58)}
              bgColor={AppStyles.colors.accent}
              textColor={AppStyles.colors.background}
              style={{
                marginVertical: scaleHeight(10),
              }}
            />

            <Text numberOfLines={3} style={styles.txtNote}>
              {translate('txtAttention')}
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
    // backgroundColor: AppStyles.colors.button,
    borderRadius: 8,
    overflow: 'hidden',
    paddingVertical: scaleHeight(5),
  },
  content_top: {
    width: '100%',
    backgroundColor: AppStyles.colors.accent,
    alignItems: 'center',
    padding: scaleWidth(20),
    zIndex: 1,
  },

  content_bottom: {
    lineHeight: 21,
    alignItems: 'center',
    backgroundColor: AppStyles.colors.button,
    padding: scaleHeight(20),
    paddingTop: scaleHeight(50),
    flex: 0,
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
