/* eslint-disable react-native/no-inline-styles */
import { CustomFlatList, CustomTextLink, CustomInput } from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles } from '@theme';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { SettingItem, ButtonCC, LabelTitle } from '../components';
import ScreenName from '../ScreenName';
import { SinglePageLayout } from '@layouts';

const OrderSection = ({ title, children }) => {
  return (
    <View>
      {!!title && (
        <LabelTitle
          label={title}
          color={AppStyles.colors.accent}
          fontSize={18}
        />
      )}
      <View>{children}</View>
    </View>
  );
};

const OrderSectionItem = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemStyle} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const ShippingType = {
  InShop: 1,
  InPlace: 2,
};

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [shippingType, setShippingType] = React.useState(ShippingType.InShop);

  return (
    <>
      <SinglePageLayout backgroundColor={AppStyles.colors.background}>
        <View style={styles.content}>
          {/**Shipping Type */}
          <OrderSection>
            <OrderSectionItem
              onPress={() => {
                setShippingType(ShippingType.InPlace);
              }}>
              <View style={AppStyles.styles.horizontalLayout}>
                <Image
                  source={images.icons.ic_delivery}
                  style={styles.imgShippingStyle}
                  resizeMode="center"
                />
                <Text style={styles.txtTitleStyle}>
                  {translate('txtShippingOrder')}
                </Text>
              </View>
              <Image
                style={styles.arrowStyle}
                source={
                  shippingType === ShippingType.InPlace
                    ? images.icons.ic_radio_active
                    : images.icons.ic_radio_inactive
                }
              />
            </OrderSectionItem>
            <OrderSectionItem
              onPress={() => {
                setShippingType(ShippingType.InShop);
              }}>
              <View style={AppStyles.styles.horizontalLayout}>
                <Image
                  source={images.icons.ic_in_store}
                  style={styles.imgShippingStyle}
                  resizeMode="center"
                />
                <Text style={styles.txtTitleStyle}>
                  {translate('txtPlaceInShopOrder')}
                </Text>
              </View>
              <Image
                style={styles.arrowStyle}
                source={
                  shippingType === ShippingType.InShop
                    ? images.icons.ic_radio_active
                    : images.icons.ic_radio_inactive
                }
              />
            </OrderSectionItem>
          </OrderSection>

          {/**Shipping Info */}
          <OrderSection title={`${translate('txtShippingInfo')}`.toUpperCase()}>
            <OrderSectionItem>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.txtStyle}>hhahah</Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: '60%',
                  backgroundColor: '#DBDBDB',
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.txtStyle}>dfdf</Text>
              </View>
            </OrderSectionItem>
            <OrderSectionItem>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <Text style={[styles.txtTitleStyle, { flex: 0 }]}>
                  {translate('txtShippingTo')} :
                </Text>
                <Text
                  style={[styles.txtStyle, { flex: 1 }]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  16 Trương Định, P. 6, Q. 3, Tp. Hồ Chí Minh
                </Text>
              </View>
              <TouchableOpacity style={styles.editOrderStyle}>
                <Image source={images.icons.ic_order_edit} />
              </TouchableOpacity>
            </OrderSectionItem>
            <TextInput
              placeholder={translate('txtNote')}
              multiline={true}
              style={styles.txtNoteStyle}
            />
          </OrderSection>

          <OrderSection title={translate('txtItemSelect')}>
            <OrderSectionItem></OrderSectionItem>
            <OrderSectionItem></OrderSectionItem>
            <OrderSectionItem></OrderSectionItem>
          </OrderSection>
          <OrderSection title={translate('txtPaymentMethod')}>
            <OrderSectionItem></OrderSectionItem>
          </OrderSection>
          <OrderSection title={translate('txtPromotionApply')}>
            <OrderSectionItem></OrderSectionItem>
          </OrderSection>
        </View>
      </SinglePageLayout>
      <View style={styles.confirmStyle}>
        <View style={styles.orderSumContent}>
          <Text style={styles.txtStyle}>Tổng cộng : </Text>
          <Text style={styles.txtPriceStyle}>0.00 đ</Text>
        </View>
        <ButtonCC.ButtonRed label={translate('txtConfirm')} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    paddingHorizontal: 10,
    paddingTop: 20,
    paddingBottom: 100,
    flex: 1,
  },

  confirmStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: AppStyles.colors.accent,
  },

  orderSumContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  txtTitleStyle: { ...AppStyles.fonts.medium, fontSize: 16 },
  txtStyle: { ...AppStyles.fonts.text, fontSize: 16 },

  txtPriceStyle: {
    ...AppStyles.fonts.title,
    fontSize: 21,
    color: AppStyles.colors.accent,
  },

  itemStyle: {
    ...AppStyles.styles.shadow,
    backgroundColor: '#fff',
    minHeight: 50,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  imgShippingStyle: {
    height: 42,
    width: 42,
    marginRight: 10,
  },

  editOrderStyle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AppStyles.colors.button,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtNoteStyle: {},
});

export default OrderScreen;
