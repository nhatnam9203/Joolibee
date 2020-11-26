/* eslint-disable react-native/no-inline-styles */
import { CustomImageBackground, CustomSwitch } from '@components';
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
import { OrderItem, CustomScrollViewHorizontal } from './widget';
import { useMutation, useQuery } from '@apollo/client';
import { query, GQL, GEX } from '@graphql';
import { format, scale } from '@utils';
import { vouchers } from '@mocks';
import { app, address, account } from '@slices';
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
  width = '100%',
  height = 52,
  borderColor = AppStyles.colors.placeholder,
  style,
}) => {
  return (
    <View
      style={[
        styles.buttonInputContainer,
        {
          height: scaleHeight(height),
          width,
          borderColor,
        },
        style,
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
        {!!icon && <Image source={icon} />}
      </TouchableOpacity>
    </View>
  );
};

const ShippingType = {
  InShop: 'storepickup',
  InPlace: 'freeshipping',
};

const CONFIRM_HEIGHT = 150;

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart_id = useSelector((state) => state.account?.cart?.id);

  const [showNotice, setShowNotice] = React.useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = React.useState(false);
  const [coupon_code, setCouponCode] = React.useState('');
  // --------- handle fetch data cart -----------
  const { data } = useQuery(GQL.CART_DETAIL, {
    variables: { cartId: cart_id },
    // fetchPolicy: 'cache-first',
  });
  // console.log('data', JSON.stringify(data));
  const responseMenu = useQuery(query.MENU_DETAIL_LIST, {
    variables: { categoryId: 4 },
    fetchPolicy: 'cache-first',
  });

  const resCustomer = useQuery(query.CUSTOMER_INFO, {
    fetchPolicy: 'only-cache',
  });

  const [setShippingMethodsOnCart] = useMutation(GQL.SET_ORDER_SHIPPING_METHOD);
  const [applyCouponToCart] = useMutation(GQL.APPLY_COUPON_TO_CART);
  const [placeOrder] = useMutation(GQL.PLACE_ORDER);
  const {
    items,
    applied_coupons,
    prices: { grand_total, discounts, subtotal_excluding_tax },
    shipping_addresses,
  } = data?.cart || {
    items: [],
    prices: { grand_total: {} },
    shipping_addresses: [{}],
  };

  const { firstname, lastname, selected_shipping_method, telephone } =
    shipping_addresses[0] || {};
  const { method_code } = selected_shipping_method || {};
  const full_address = format.addressFull(shipping_addresses[0]);
  const [shippingType, setShippingType] = React.useState(method_code);
  const total = format.jollibeeCurrency({
    value: grand_total.value,
    currency: 'VND',
  });

  const _discount = format.jollibeeCurrency(discounts ? discounts.amount : {});
  const subTotal = format.jollibeeCurrency(
    subtotal_excluding_tax ? subtotal_excluding_tax : {},
  );
  const addresses = resCustomer?.data.customer?.addresses || [];
  const shipping_address =
    addresses.length > 0 ? addresses.find((x) => x.default_shipping) : {};

  const {
    // full_address,
    // lastname,
    // firstname,
    // telephone,
    company,
    id,
    default_shipping,
    region,
    city,
    // street,
  } = shipping_address;
  // -------- handle fetch data cart -----------

  // const editAddress = () => {
  //   if (shipping_address) {
  //     dispatch(
  //       address.selectedLocation({
  //         region: region?.region,
  //         city: city,
  //         street: street,
  //         addressFull: full_address,
  //       }),
  //     );
  //     const val_address = {
  //       phone: telephone,
  //       place: company,
  //       firstname: firstname,
  //       lastname: lastname,
  //       note: '',
  //       id,
  //       default_shipping,
  //     };
  //     navigation.navigate(ScreenName.DetailMyAddress, {
  //       val_address,
  //       titleHeader: translate('txtEditAddress'),
  //     });
  //   } else {
  //     navigation.navigate(ScreenName.MyAddress);
  //   }
  // };

  const onChangeCouponCode = (val) => setCouponCode(val);

  const onTogglePopupNotice = () => {
    setShowNotice(false);
  };
  const onTogglePopupSuccess = () => {
    dispatch(account.clearCartState());
    setShowPopupSuccess(false);
  };

  const onEdit = () => {
    shippingType === ShippingType.InShop
      ? navigation.navigate(ScreenName.StorePickup)
      : navigation.navigate(ScreenName.MyAddress, { selected_address: true });
  };

  const onChangePaymentMethod = (code) => {
    dispatch(app.showLoading());
    setShippingMethodsOnCart({
      variables: {
        cart_id: cart_id,
        shipping_methods: [
          {
            carrier_code: code,
            method_code: code,
          },
        ],
      },
    })
      .then(() => {
        setShippingType(code);
        dispatch(app.hideLoading());
      })
      .catch(() => {
        dispatch(app.hideLoading());
      });
  };

  const onApplyCoupon = () => {
    dispatch(app.showLoading());
    applyCouponToCart({
      variables: {
        cart_id: cart_id,
        coupon_code,
      },
    })
      .then((res) => {
        if (res?.data?.applyCouponToCart) {
          setCouponCode('');
        }
        dispatch(app.hideLoading());
      })
      .catch(() => {
        dispatch(app.hideLoading());
      });
  };

  const onSubmit = () => {
    dispatch(app.showLoading());
    placeOrder({
      variables: {
        cart_id: cart_id,
      },
    })
      .then((res) => {
        if (res?.data?.placeOrder) {
          setShowPopupSuccess(true);
        }
        dispatch(app.hideLoading());
      })
      .catch(() => {
        dispatch(app.hideLoading());
      });
  };

  React.useEffect(() => {
    setTimeout(() => {
      setShowNotice(true);
    }, 1500);
  }, []);

  const renderItemExtra = (item, index) => (
    <View key={index + ''} style={{ flex: 1 }}>
      <OrderNewItem
        shadow={true}
        loading={responseMenu.loading}
        item={item}
        onPress={() => {
          navigation.navigate(ScreenName.MenuItemDetail, {
            product: item,
          });
        }}
      />
    </View>
  );

  const VoucherContent = ({
    style,
    content,
    colorText = AppStyles.colors.moderate_cyan,
    icon = images.icons.ic_sticked,
  }) => (
    <View style={[styles.voucherContainer, style]}>
      <Image style={styles.voucherIcon} source={icon} />
      <Text style={[styles.voucherText, { color: colorText }]}>{content}</Text>
    </View>
  );

  const renderItemVoucher = (item, index) => {
    const color =
      item.status === 'error'
        ? AppStyles.colors.accent
        : AppStyles.colors.moderate_cyan;
    const icon =
      item.status === 'error'
        ? images.icons.ic_warning
        : images.icons.ic_sticked;
    return (
      <OrderButtonInput
        key={index + ''}
        icon={images.icons.ic_delete}
        btnWidth={scaleWidth(43)}
        height={43}
        width={scaleWidth(230)}
        borderColor={color}
        bgColor={color}
        style={{ marginRight: 5 }}>
        <VoucherContent content={item.name} colorText={color} icon={icon} />
      </OrderButtonInput>
    );
  };

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.container}>
      <SinglePageLayout>
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
                  shippingType === ShippingType.InPlace
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
                  shippingType === ShippingType.InShop
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
                  {shippingType === ShippingType.InPlace
                    ? translate('txtShippingTo')
                    : translate('txtToReceive')}
                  :
                </Text>
                <Text
                  style={[styles.txtStyle, { flex: 1 }]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {full_address}
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
          </OrderSection>

          {/**Order Extra List*/}
          <OrderSection
            title={translate('txtExtraProduct')}
            titleColor={AppStyles.colors.text}
            key="ExtraItems">
            <CustomScrollViewHorizontal
              data={responseMenu.data?.products?.items || []}
              contentContainerStyle={{
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}
              renderItem={renderItemExtra}
            />
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
            <OrderSectionItem height={160}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <OrderButtonInput
                  onPress={onApplyCoupon}
                  title={translate('txtApply')}
                  btnWidth={126}
                  bgColor={AppStyles.colors.accent}>
                  <TextInput
                    placeholder={translate('txtInputVoucher')}
                    style={{ paddingHorizontal: 10, flex: 1 }}
                    value={coupon_code}
                    onChangeText={onChangeCouponCode}
                  />
                </OrderButtonInput>

                <View
                  style={{
                    height: 45,
                    marginTop: 19,
                    justifyContent: 'center',
                  }}>
                  <CustomScrollViewHorizontal
                    data={vouchers}
                    renderItem={renderItemVoucher}
                  />
                </View>
              </View>
            </OrderSectionItem>
          </OrderSection>

          {/**Points */}
          <OrderSection
            title={translate('txtRedeemPoints')}
            key="OrderCumulativePoints"
            buttonComponent={() => (
              <View style={AppStyles.styles.horizontalLayout}>
                <Text style={styles.txtPoint}>
                  {translate('txtMySavedPoint')}:
                </Text>
                <View style={styles.pointContainer}>
                  <Text style={styles.txtPoint}>120 điểm</Text>
                </View>
              </View>
            )}>
            <OrderSectionItem height={117}>
              <OrderButtonInput
                title={translate('txtApply')}
                btnWidth={126}
                bgColor={AppStyles.colors.accent}>
                <TextInput
                  placeholder={'Vd: 5, 10, 15, 20, 25, 30.....'}
                  style={{ paddingHorizontal: 10, flex: 1 }}
                  keyboardType="numeric"
                />
              </OrderButtonInput>
            </OrderSectionItem>
          </OrderSection>
        </SafeAreaView>
      </SinglePageLayout>

      <View style={styles.confirmStyle}>
        <View style={styles.orderSumContent}>
          <Text style={styles.txtStyle}>
            {translate('txtOrderCalculator')}:
          </Text>
          <Text style={styles.txtSubPriceStyle}>{subTotal}</Text>
        </View>

        <View style={styles.orderSumContent}>
          <Text style={styles.txtStyle}>Khuyến mãi : </Text>
          <VoucherContent
            content="Voucher ưu đãi 30K"
            style={{
              paddingHorizontal: 0,
            }}
          />
          <Text style={styles.txtSubPriceStyle}>{_discount}</Text>
        </View>

        <View style={styles.orderSumContent}>
          <VoucherContent
            content="Đổi 20 điểm nhận 20.000đ."
            style={{
              paddingHorizontal: 0,
              justifyContent: 'flex-end',
              marginRight: scaleWidth(17),
            }}
          />

          <Text style={styles.txtSubPriceStyle}>{total}</Text>
        </View>

        <View style={styles.orderSumContent}>
          <Text style={styles.txtTitleStyle}>Tổng cộng : </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.txtPointStyle}>(+ 20 điểm)</Text>
            <Text style={styles.txtPriceStyle}>{total}</Text>
          </View>
        </View>

        <ButtonCC.ButtonRed
          label={translate('txtConfirm')}
          onPress={onSubmit}
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
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    // paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: CONFIRM_HEIGHT * 1.7,
  },

  confirmStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 17,
    paddingTop: 24,
    shadowColor: '#00000070',
    shadowOffset: {
      width: 3,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8.3,
    elevation: 10,
  },

  orderSumContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // padding: 10,
    alignItems: 'center',
  },

  txtTitleStyle: {
    ...AppStyles.fonts.medium,
    fontSize: scaleWidth(16),
    margin: 5,
  },
  txtStyle: { ...AppStyles.fonts.text, fontSize: scaleWidth(16), margin: 5 },

  txtPriceStyle: {
    ...AppStyles.fonts.title,
    fontSize: scaleWidth(21),
    color: AppStyles.colors.accent,
  },

  txtSubPriceStyle: {
    ...AppStyles.fonts.bold,
    fontSize: 16,
    // color: AppStyles.colors.accent,
  },

  txtPointStyle: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    fontSize: scaleWidth(14),
    marginRight: scaleWidth(17),
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
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  rightBtnInput: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  voucherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  voucherIcon: {
    width: scaleWidth(17),
    height: scaleHeight(17),
    resizeMode: 'contain',
  },
  voucherText: {
    ...AppStyles.fonts.text,
    color: AppStyles.colors.moderate_cyan,
    marginLeft: 3,
    fontSize: scaleWidth(16),
  },
  pointContainer: {
    paddingHorizontal: 5,
    paddingVertical: 6,
    backgroundColor: AppStyles.colors.button,
    marginLeft: 5,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPoint: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    fontSize: scaleWidth(14),
  },
});

export default OrderScreen;
