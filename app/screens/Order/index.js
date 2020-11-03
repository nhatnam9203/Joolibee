/* eslint-disable react-native/no-inline-styles */
import { CustomButtonImage, CustomSwitch } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import React from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonCC,
  LabelTitle,
  PopupNoticeEnvironment,
  PopupOrderSuccess,
} from '../components';
import ScreenName from '../ScreenName';
import { OrderItems } from './LocalData';
import { OrderItem } from './widget';
import { useMutation, useQuery } from '@apollo/client';
import { mutation, query } from '@graphql';
import { format } from "@utils";

const OrderSection = ({ title, children, buttonComponent }) => {


  return (
    <View>
      <View style={AppStyles.styles.horizontalLayout}>
        {!!title && (
          <LabelTitle
            label={title}
            color={AppStyles.colors.accent}
            fontSize={18}
          />
        )}
        {buttonComponent && buttonComponent()}
      </View>
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

const CONFIRM_HEIGHT = 150;

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart_id = useSelector((state) => state.cart?.cart_id);

  const [shippingType, setShippingType] = React.useState(selected_payment_method);
  const [showNotice, setShowNotice] = React.useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = React.useState(false);

  // --------- handle fetch data cart -----------
  const { data, error, loading, refetch } = useQuery(query.CART_DETAIL, {
    variables: { cartId: cart_id },
    //  fetchPolicy: 'cache-first'
  });
  console.log('data', data)
  const {
    items,
    shipping_addresses,
    applied_coupons,
    selected_payment_method,
    prices: {
      grand_total,
      discounts,
      subtotal_excluding_tax,
    }
  } = data?.cart || { items: [], prices: { grand_total: {} }, shipping_addresses: [] };

  const total = format.jollibeeCurrency({ value: grand_total.value, currency: 'VND' });
  const _discount = format.jollibeeCurrency(discounts ? discounts.amount : {});
  const subTotal = format.jollibeeCurrency(subtotal_excluding_tax ? subtotal_excluding_tax : {});
  const { firstname, lastname, city, region, street } = shipping_addresses[0] || {};
  const addressFull = `${street[0] || ''} ${city} ${region.label}`
  // -------- handle fetch data cart -----------

  const onTogglePopupNotice = () => {
    setShowNotice(false);
  };
  const onTogglePopupSuccess = () => {
    setShowPopupSuccess(false);
  };

  const onEdit = () => {
    shippingType?.code == ShippingType["InShop"]
      ? navigation.navigate(ScreenName.StorePickup)
      : () => { }
  };

  const onChangePaymentMethod = (code) => {
    setShippingType({
      code,
      title: translate(code == 1 ? 'txtPlaceInShopOrder' : "txtShippingOrder")
    })
  };

  React.useEffect(() => {
    setTimeout(() => {
      setShowNotice(true);
    }, 1500);
  }, []);

  return (
    <>
      <SinglePageLayout backgroundColor={AppStyles.colors.background}>
        <SafeAreaView style={styles.content}>
          {/**Shipping Type */}
          <OrderSection key="ShippingType">
            <OrderSectionItem
              onPress={() => {
                onChangePaymentMethod(ShippingType.InPlace);
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
                  shippingType?.code === ShippingType.InPlace
                    ? images.icons.ic_radio_active
                    : images.icons.ic_radio_inactive
                }
              />
            </OrderSectionItem>
            <OrderSectionItem
              onPress={() => {
                onChangePaymentMethod(ShippingType.InShop);
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
                  shippingType?.code === ShippingType.InShop
                    ? images.icons.ic_radio_active
                    : images.icons.ic_radio_inactive
                }
              />
            </OrderSectionItem>
          </OrderSection>

          {/**Shipping Info */}
          <OrderSection
            title={`${translate('txtShippingInfo')}`.toUpperCase()}
            key="ShippingInfo">
            <OrderSectionItem>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.txtStyle}>{firstname}</Text>
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
                <Text style={styles.txtStyle}>{lastname}</Text>
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
                  {shippingType?.code === ShippingType.InPlace
                    ? translate('txtShippingTo')
                    : translate('txtToReceive')}
                  :
                </Text>
                <Text
                  style={[styles.txtStyle, { flex: 1 }]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {addressFull}
                </Text>
              </View>

              <CustomButtonImage
                onPress={onEdit}
                image={images.icons.ic_order_edit}
                style={styles.editOrderStyle}
              />
            </OrderSectionItem>
            <OrderSectionItem>
              <TextInput
                placeholder={translate('txtNote')}
                multiline={true}
                style={styles.txtNoteStyle}
              />
            </OrderSectionItem>
          </OrderSection>

          {/**Order Items List*/}
          <OrderSection
            title={translate('txtItemSelect')}
            buttonComponent={() => (
              <ButtonCC.ButtonYellow
                label={translate('txtOrderMore')}
                style={styles.buttonHeaderStyle}
                textStyle={styles.headerButtonTextStyle}
              />
            )}
            key="OrderItems">
            {items.map((item, index) => (
              <OrderSectionItem key={index + ''}>
                <OrderItem item={item} />
              </OrderSectionItem>
            ))}

            <OrderSectionItem>
              <View style={styles.orderSumContent}>
                <Text style={styles.txtTitleStyle}>
                  {translate('txtOrderCalculator')} :
                </Text>
                <Text style={styles.txtStyle}>{subTotal}</Text>
              </View>
            </OrderSectionItem>
            <OrderSectionItem>
              <View style={styles.orderSumContent}>
                <View style={styles.container}>
                  <Text style={styles.txtTitleStyle}>
                    {translate('txtNotice')}
                  </Text>
                  <Text style={styles.txtStyle}>
                    {translate('txtNoticeEnvironment')}
                  </Text>
                </View>
                <CustomSwitch />
              </View>
            </OrderSectionItem>
          </OrderSection>

          {/**Payment*/}
          <OrderSection
            title={translate('txtPaymentMethod')}
            key="OrderPayment">
            <OrderSectionItem>
              <View style={AppStyles.styles.horizontalLayout}>
                <Image source={images.icons.ic_money} />
                <Text style={styles.txtStyle}>
                  {translate('txtPaymentMoney')}
                </Text>
              </View>
            </OrderSectionItem>
          </OrderSection>

          {/**Promotion */}
          <OrderSection
            title={translate('txtPromotionApply')}
            key="OrderPromotion">
            <OrderSectionItem>
              <View style={AppStyles.styles.horizontalLayout}>
                <Image source={images.icons.ic_sticked} />
                <Text style={styles.txtStyle}>Ưu đãi {_discount}</Text>
              </View>
              <CustomButtonImage
                image={images.icons.ic_order_edit}
                style={styles.editOrderStyle}
                onPress={() => {
                  navigation.navigate(ScreenName.MyReward);
                }}
              />
            </OrderSectionItem>
          </OrderSection>
        </SafeAreaView>
      </SinglePageLayout>

      <View style={styles.confirmStyle}>
        <View style={styles.orderSumContent}>
          <Text style={styles.txtStyle}>Tổng cộng : </Text>
          <Text style={styles.txtPriceStyle}>{total}</Text>
        </View>

        <ButtonCC.ButtonRed
          label={translate('txtConfirm')}
          onPress={() => {
            setShowPopupSuccess(true);
          }}
        />
      </View>

      {/**Popup Notice */}
      <PopupNoticeEnvironment
        visible={showNotice}
        onToggle={onTogglePopupNotice}
      />

      {/**Popup Order Success */}
      <PopupOrderSuccess
        visible={showPopupSuccess}
        onToggle={onTogglePopupSuccess}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: CONFIRM_HEIGHT * 2,
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
    height: CONFIRM_HEIGHT,
  },

  orderSumContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },

  txtTitleStyle: { ...AppStyles.fonts.medium, fontSize: 16, margin: 5 },
  txtStyle: { ...AppStyles.fonts.text, fontSize: 16, margin: 5 },

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

  buttonHeaderStyle: { width: '40%', height: '60%' },

  headerButtonTextStyle: {
    fontSize: 14,
    color: '#1B1B1B',
  },
});

export default OrderScreen;
