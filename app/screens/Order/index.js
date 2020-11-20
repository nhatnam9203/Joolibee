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
  OrderNewItem,
} from '../components';
import ScreenName from '../ScreenName';
import { OrderItem } from './widget';
import { useMutation, useQuery } from '@apollo/client';
import { mutation, query } from '@graphql';
import { format, scale } from '@utils';
import { ScrollView } from 'react-native-gesture-handler';
const { scaleWidth, scaleHeight } = scale;

const OrderSection = ({
  titleColor = AppStyles.colors.accent,
  title,
  children,
  buttonComponent,
}) => {
  return (
    <View>
      <View style={[AppStyles.styles.horizontalLayout, { padding: 17 }]}>
        {!!title && (
          <LabelTitle label={title} color={titleColor} fontSize={18} />
        )}
        {buttonComponent && buttonComponent()}
      </View>
      <View>{children}</View>
    </View>
  );
};

const OrderSectionItem = ({ children, onPress, height = 66 }) => {
  return (
    <TouchableOpacity
      style={[
        styles.itemStyle,
        {
          minHeight: height,
        },
      ]}
      onPress={onPress}
      disabled={!onPress}>
      {children}
    </TouchableOpacity>
  );
};

const OrderButtonInput = ({
  children,
  onPress,
  title,
  icon,
  bgColor,
  btnWidth,
  height = 52,
}) => {
  return (
    <View
      style={[
        styles.buttonInputContainer,
        {
          height: scaleHeight(height),
        },
      ]}
      onPress={onPress}
      disabled={!onPress}>
      {children}
      <TouchableOpacity
        style={[
          styles.rightBtnInput,
          {
            backgroundColor: bgColor,
            width: btnWidth,
          },
        ]}
        onPress={onPress}>
        {!!title && (
          <LabelTitle
            label={title}
            color={AppStyles.colors.white}
            fontSize={15}
          />
        )}
        {!!icon && <Image />}
      </TouchableOpacity>
    </View>
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

  const [shippingType, setShippingType] = React.useState(
    selected_payment_method,
  );
  const [showNotice, setShowNotice] = React.useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = React.useState(false);

  // --------- handle fetch data cart -----------
  const { data } = useQuery(query.CART_DETAIL, {
    variables: { cartId: cart_id },
    fetchPolicy: 'cache-first',
  });
  const responseMenu = useQuery(query.MENU_DETAIL_LIST, {
    variables: { categoryId: 4 },
    fetchPolicy: 'cache-first',
  });
  const {
    items,
    shipping_addresses,
    applied_coupons,
    selected_payment_method,
    prices: { grand_total, discounts, subtotal_excluding_tax },
  } = data?.cart || {
    items: [],
    prices: { grand_total: {} },
    shipping_addresses: [{}],
  };

  const total = format.jollibeeCurrency({
    value: grand_total.value,
    currency: 'VND',
  });
  const _discount = format.jollibeeCurrency(discounts ? discounts.amount : {});
  const subTotal = format.jollibeeCurrency(
    subtotal_excluding_tax ? subtotal_excluding_tax : {},
  );
  const { firstname, lastname, telephone, city, region = {}, street = [{}] } =
    shipping_addresses[0] || {};
  const addressFull = `${street[0] || ''} ${city} ${region.label}`;
  // -------- handle fetch data cart -----------

  const onTogglePopupNotice = () => {
    setShowNotice(false);
  };
  const onTogglePopupSuccess = () => {
    setShowPopupSuccess(false);
  };

  const onEdit = () => {
    shippingType?.code === ShippingType.InShop
      ? navigation.navigate(ScreenName.StorePickup)
      : () => {};
  };

  const onChangePaymentMethod = (code) => {
    setShippingType({
      code,
      title: translate(code === 1 ? 'txtPlaceInShopOrder' : 'txtShippingOrder'),
    });
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
          <OrderSection
            key="ShippingType"
            title={`${translate('txtOrderMethod')}`.toUpperCase()}>
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
            key="ShippingInfo"
            buttonComponent={() => (
              <ButtonCC.ButtonYellow
                label={translate('txtEdit')}
                style={styles.buttonHeaderStyle}
                textStyle={styles.headerButtonTextStyle}
                onPress={onEdit}
              />
            )}>
            <OrderSectionItem>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                }}>
                <Text style={styles.txtStyle}>
                  {firstname + ' ' + lastname}
                </Text>
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
                  paddingLeft: 17,
                }}>
                <Text style={styles.txtStyle}>{telephone}</Text>
              </View>
            </OrderSectionItem>

            <OrderSectionItem>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
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
            </OrderSectionItem>
            <OrderSectionItem height={78}>
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
            {/* 
            <OrderSectionItem>
              <View style={styles.orderSumContent}>
                <Text style={styles.txtTitleStyle}>
                  {translate('txtOrderCalculator')} :
                </Text>
                <Text style={styles.txtStyle}>{subTotal}</Text>
              </View>
            </OrderSectionItem> */}
          </OrderSection>

          {/**Order Extra List*/}
          <OrderSection
            title={translate('txtExtraProduct')}
            titleColor={AppStyles.colors.text}
            key="ExtraItems">
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {responseMenu.data?.products?.items.map((item, index) => (
                <View key={index + ''} style={{ flex: 1 }}>
                  <OrderNewItem
                    shadow={true}
                    loading={responseMenu.loading}
                    item={item}
                    onPress={() => {
                      navigation.navigate(ScreenName.MenuItemDetail, {
                        productItem: item,
                      });
                    }}
                  />
                </View>
              ))}
            </ScrollView>

            <OrderSectionItem height={84}>
              <TextInput
                placeholder={'Thêm ghi chú (vd: không cay...)'}
                multiline={true}
                style={styles.txtNoteStyle}
              />
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
              <OrderButtonInput
                title="ÁP DỤNG"
                btnWidth={126}
                bgColor={AppStyles.colors.accent}>
                <TextInput
                  placeholder={'Nhập mã khuyến mãi'}
                  style={{ paddingHorizontal: 10, flex: 1 }}
                />
              </OrderButtonInput>
              {/* <View style={AppStyles.styles.horizontalLayout}>
                <Image source={images.icons.ic_sticked} />
                <Text style={styles.txtStyle}>Ưu đãi {_discount}</Text>
              </View>
              <CustomButtonImage
                image={images.icons.ic_order_edit}
                style={styles.editOrderStyle}
                onPress={() => {
                  navigation.navigate(ScreenName.MyReward);
                }}
              /> */}
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
    // paddingHorizontal: 10,
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
    backgroundColor: '#fff',
    marginVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
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

  buttonHeaderStyle: { width: scaleWidth(122), height: scaleHeight(55) },

  headerButtonTextStyle: {
    fontSize: 14,
    color: '#1B1B1B',
  },
  buttonInputContainer: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    borderColor: AppStyles.colors.placeholder,
  },
  rightBtnInput: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});

export default OrderScreen;
