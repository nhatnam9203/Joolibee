/* eslint-disable react-native/no-inline-styles */
import { CustomImageBackground, CustomSwitch, Loading } from '@components';
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
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  ButtonCC,
  PopupNoticeEnvironment,
  PopupOrderSuccess,
  OrderNewItem,
  TextInputErrorMessage,
} from '../components';
import ScreenName from '../ScreenName';
import {
  OrderItem,
  CustomScrollViewHorizontal,
  OrderSection,
  OrderSectionItem,
  OrderButtonInput,
  OrderVoucherItem,
} from './widget';
import { useMutation, useLazyQuery } from '@apollo/client';
import { query, GQL, GEX, useGraphQLClient } from '@graphql';
import { format, scale, appUtil } from '@utils';
import { vouchers } from '@mocks';
import { app, account, order } from '@slices';
import { useStorePickup } from '@hooks';
import NavigationService from '../../navigation/NavigationService';

const { scaleWidth, scaleHeight } = scale;

const ShippingType = {
  InShop: 'storepickup',
  InPlace: 'freeshipping',
};
const COUNTDOWN_SECONDS = 30;
const CONFIRM_HEIGHT = 150;
const MINIUM_POINT = 25;

const OrderScreen = ({ route = { params: {} } }) => {
  const { shippingMethod, addressParams } = route.params;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const graphQlClient = useGraphQLClient();

  /** AUTO LOAD VALUE */
  const isEatingUtensils = useSelector(
    (state) => state.account?.isEatingUtensils,
  );
  const count_input_coupon = useSelector(
    (state) => state.account?.count_input_coupon,
  );

  const timming = useSelector((state) => state.account?.timming);

  // show dialog notice
  const [showNotice, setShowNotice] = React.useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = React.useState(false);
  const [coupon_code, setCouponCode] = React.useState('');
  const [reward_point, setRewardPoint] = React.useState('');
  const [order_number, setOrderNumber] = React.useState('');
  const [error_point, showErrorPoint] = React.useState(null);
  const [availableStores, setAvailableStores] = React.useState(null);

  // const onCallBackEndCountDown = () => {
  //   dispatch(account.toggleTimmer());
  //   dispatch(account.setCountInputCoupon(5));
  // };
  // const number = useTimerBackground(30, timming, onCallBackEndCountDown);

  // ----------------- Timming apply coupon ------------------------ //

  // ----------------- Timming apply coupon ------------------------ //

  const storeList = useStorePickup();

  // =================================
  // id dung cho store pickup
  const store_pickup_id = useSelector(
    (state) => state.order?.pickup_location_code,
  );
  const [isPickupStore, setIsPickupStore] = React.useState(false);

  // --------- REQUEST CART-DETAIL -----------
  const [customerCart, getCheckOutCart] = GEX.useGetCustomerCart();
  // const [customerCart, getCheckOutCart] = GEX.useGetCheckOutCart();

  const {
    items,
    applied_coupons,
    prices,
    shipping_addresses,
    bonus_point,
    used_point,
  } = customerCart || {};

  const { grand_total, discounts, subtotal_excluding_tax } = prices || {};

  const shippingAddress = shipping_addresses?.find(Boolean);
  const {
    firstname = '',
    lastname = '',
    selected_shipping_method = ShippingType.InPlace,
    telephone = '',
  } = shippingAddress || {};

  const { method_code } = selected_shipping_method || {};
  const full_address = format.addressFull(shippingAddress) ?? '';
  const total = format.jollibeeCurrency({
    value: grand_total?.value,
    currency: 'VND',
  });
  const _discount = format.jollibeeCurrency(discounts ? discounts?.amount : {});
  const subTotal = format.jollibeeCurrency(
    subtotal_excluding_tax ? subtotal_excluding_tax : {},
  );
  const [customerInfo] = GEX.useCustomer();
  const [shippingType, setShippingType] = React.useState(method_code);

  // update cart product
  const { updateCartItems, updateCartResp } = GEX.useUpdateCustomerCart();
  // add voucher
  const [applyCouponToCart] = useMutation(GQL.APPLY_COUPON_TO_CART);
  // submit checkout
  const [placeOrder] = useMutation(GQL.PLACE_ORDER);
  // Call get món đi kèm
  const [getSubMenu, responseMenu] = useLazyQuery(query.MENU_DETAIL_LIST, {
    variables: { categoryId: 4 },
    fetchPolicy: 'cache-first',
  });
  // Redeem points
  const { redeemCustomerPoint, redeemCustomerPointResp } = GEX.useRedeemPoint();
  /**
   * SET SIPPING
   */

  const [
    shippingMethodResp,
    setShippingMethods,
  ] = GEX.useSetShippingMethodsOnCart();

  // const {
  //   setShippingAddresses,
  //   setShippingAddressesOnCartResp,
  // } = GEX.useSetShippingAddress();
  const [shippingAddressResp, setShippingAddress] = GEX.useSetShippingAddress();

  const updateMyCart = (item) => {
    let input = {
      cart_item_id: item.id,
      quantity: item.quantity,
    };

    updateCartItems({
      variables: input,
    });
  };

  const onChangeCouponCode = (val) => setCouponCode(val);
  const onChangeRewardPoint = (point) => setRewardPoint(point);
  const onTogglePopupNotice = () => {
    setShowNotice(false);
  };
  const onTogglePopupSuccess = () => {
    setShowPopupSuccess(false);
  };

  const ontoggleSwitch = () => {
    dispatch(account.setEatingUtensils());
  };
  const onEdit = () => {
    if (shippingType === ShippingType.InShop) {
      navigation.navigate(ScreenName.StorePickup, {
        stores: availableStores,
      });

      dispatch(order.pickupStore(null));
      setIsPickupStore(true);
    } else {
      navigation.navigate(ScreenName.MyAddress, { selected_address: true });
    }
  };

  /**
   * SET SHIPPING METHOD
   * @param {*} code : ["freeshipping", "storepickup"]
   */
  const onChangeShippingMethod = (code) => {
    Logger.debug(availableStores, ' ========xxxxxxxx> availableStores');
    switch (code) {
      case ShippingType.InShop:
        navigation.navigate(ScreenName.StorePickup, {
          stores: availableStores,
        });

        dispatch(order.pickupStore(null));
        setIsPickupStore(true);

        break;
      default:
        let store_id = null;
        if (availableStores) {
          const pickStore = availableStores.find(Boolean);
          store_id = pickStore?.id;
        }

        Logger.debug(store_id, '========> store_id');
        setShippingType(code);
        dispatch(app.showLoading());
        setShippingMethods(code, store_id);
        dispatch(order.pickupStore(null));
        dispatch(app.hideLoading());

        break;
    }
  };
  const onApplyCoupon = () => {
    dispatch(app.showLoading());
    applyCouponToCart({
      variables: {
        cart_id: customerCart?.id,
        coupon_code,
      },
    })
      .then((res) => {
        if (res?.data?.applyCouponToCart) {
          setCouponCode('');
          // dispatch(account.toggleTimmer());
          // dispatch(account.setCountInputCoupon(5));
        }
        // dispatch(account.setCountInputCoupon(count_input_coupon - 1));
        // if (count_input_coupon - 1 <= 0) {
        //   dispatch(account.toggleTimmer());
        // }

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
        cart_id: customerCart?.id,
      },
    })
      .then((res) => {
        if (res?.data?.placeOrder) {
          graphQlClient.cache.evict({ fieldName: 'cart' });
          graphQlClient.cache.evict({ fieldName: 'customerCart' });
          graphQlClient.cache.gc();
          setOrderNumber(res?.data?.placeOrder?.order?.order_number);
          setShowPopupSuccess(true);
          showErrorPoint(false);
          dispatch(order.pickupStore(null));
          getCheckOutCart(true);

          /// chua get lai list order
        }
        dispatch(app.hideLoading());
      })
      .catch(() => {
        dispatch(app.hideLoading());
      });
  };

  const onRedeemPoint = () => {
    if (+reward_point >= MINIUM_POINT) {
      let remainder = reward_point % MINIUM_POINT;
      let use_point = reward_point - remainder;
      dispatch(app.showLoading());
      redeemCustomerPoint(use_point).then((res) => {
        if (res?.data?.useCustomerPoint) {
          getCheckOutCart();
          setRewardPoint('');
          showErrorPoint(false);
        }
        dispatch(app.hideLoading());
      });
    } else {
      showErrorPoint(true);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setShowNotice(isEatingUtensils);
    }, 1000);
  }, [isEatingUtensils]);

  React.useEffect(() => {
    getSubMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    // List store available ============
    const methodInPlace = shippingMethod?.results?.find(
      (x) => x.method === ShippingType.InPlace,
    );
    const methodInShop = shippingMethod?.results?.find(
      (x) => x.method === ShippingType.InShop,
    );

    let arr = storeList;
    if (methodInShop?.stores) {
      arr = methodInShop?.stores?.map((st) => {
        const findStore = storeList?.find((x) => x.id === st.id.toString());
        return findStore;
      });
    }

    setAvailableStores(arr);
  }, [shippingMethod?.results, storeList]);
  React.useEffect(() => {
    if (addressParams && store_pickup_id) {
      setShippingType(ShippingType.InShop);

      const setShippingMethod = async () => {
        const { variables } = addressParams;
        let pickupAddress = variables.shipping_addresses[0];
        // const pickupStoreAddress = Object.assign({}, pickupAddress, {
        //   pickup_location_code: store_pickup_id,
        // });
        const params = Object.assign({}, addressParams, {
          variables: {
            shipping_addresses: [pickupAddress],
          },
        });

        await dispatch(app.showLoading());
        await setShippingAddress(params);

        await setShippingMethods(ShippingType.InShop, store_pickup_id);
        await dispatch(app.hideLoading());
      };

      setShippingMethod();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store_pickup_id]);

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
        <OrderVoucherItem content={item.name} colorText={color} icon={icon} />
      </OrderButtonInput>
    );
  };

  const renderShippingTypeSection = () => (
    <OrderSection
      key="ShippingType"
      title={`${translate('txtOrderMethod')}`.toUpperCase()}>
      {shippingMethod?.results.map((sm) => (
        <OrderSectionItem
          key={sm.method}
          onPress={() => {
            onChangeShippingMethod(sm.method);
          }}>
          <View style={AppStyles.styles.horizontalLayout}>
            <Image
              source={
                sm.method === ShippingType.InShop
                  ? images.icons.ic_in_store
                  : images.icons.ic_delivery
              }
              style={styles.imgShippingStyle}
              resizeMode="center"
            />
            <Text style={styles.txtTitleStyle}>
              {sm.method === ShippingType.InShop
                ? translate('txtPlaceInShopOrder')
                : translate('txtShippingOrder')}
            </Text>
          </View>
          <Image
            style={styles.arrowStyle}
            source={
              shippingType === sm.method
                ? images.icons.ic_radio_active
                : images.icons.ic_radio_inactive
            }
          />
        </OrderSectionItem>
      ))}
    </OrderSection>
  );

  const renderAddressShippingSection = () => (
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
          <Text style={styles.txtStyle}>{firstname + ' ' + lastname}</Text>
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
          placeholder={translate('txtNoteShipping')}
          multiline={true}
          style={styles.txtNoteStyle}
        />
      </OrderSectionItem>
    </OrderSection>
  );

  const renderProductItem = () => (
    <OrderSection
      title={translate('txtItemSelect')}
      buttonComponent={() => (
        <ButtonCC.ButtonYellow
          label={translate('txtOrderMore')}
          style={styles.buttonHeaderStyle}
          textStyle={styles.headerButtonTextStyle}
          onPress={() => {
            navigation.navigate(ScreenName.Menu);
          }}
        />
      )}
      key="OrderItems">
      {items?.map((item, index) => (
        <OrderSectionItem key={index + ''}>
          <OrderItem
            item={item}
            updateMyCart={updateMyCart}
            onPress={() => {
              navigation.navigate(ScreenName.MenuItemDetail, {
                product: item?.product,
                detailItem: item,
              });
            }}
          />
        </OrderSectionItem>
      ))}
    </OrderSection>
  );

  const renderExtraItems = () => (
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
            <Text style={styles.txtTitleStyle}>{translate('txtNotice')}</Text>
            <Text style={styles.txtStyle}>
              {translate('txtNoticeEnvironment')}
            </Text>
          </View>
          <CustomSwitch
            toggleSwitch={ontoggleSwitch}
            defautlValue={isEatingUtensils}
          />
        </View>
      </OrderSectionItem>
    </OrderSection>
  );

  // const renderBlockedApplyCoupon = () => {
  //   return timming ? (
  //     <Text style={{ width: '100%', marginVertical: 5 }}>
  //       {translate('txtTryAgain') + ' (' + number + ') '}
  //     </Text>
  //   ) : (
  //     <TextInputErrorMessage
  //       style={{ width: '100%', marginVertical: 5 }}
  //       message={
  //         count_input_coupon < 5 &&
  //         `${translate('txtYouHave')} ${count_input_coupon} ${translate(
  //           'txtInputCode',
  //         )}`
  //       }
  //       color={AppStyles.colors.inputError}
  //     />
  //   );
  // };

  const renderPromotion = () => (
    <OrderSection title={translate('txtPromotionApply')} key="OrderPromotion">
      <OrderSectionItem height={160}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <OrderButtonInput
            onPress={onApplyCoupon}
            disabled={!coupon_code || timming}
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
          {/* {renderBlockedApplyCoupon()} */}
          {applied_coupons && (
            <View
              style={{
                height: 45,
                // marginTop: 19,
                justifyContent: 'center',
              }}>
              <CustomScrollViewHorizontal
                data={vouchers}
                renderItem={renderItemVoucher}
              />
            </View>
          )}
        </View>
      </OrderSectionItem>
    </OrderSection>
  );

  const renderPoint = () => (
    <OrderSection
      title={translate('txtRedeemPoints')}
      key="OrderCumulativePoints"
      buttonComponent={() => (
        <View style={AppStyles.styles.horizontalLayout}>
          <Text style={styles.txtPoint}>{translate('txtMySavedPoint')}:</Text>
          <View style={styles.pointContainer}>
            <Text style={styles.txtPoint}>
              {customerInfo?.customer_point ?? 0} {translate('txtPoint')}
            </Text>
          </View>
        </View>
      )}>
      <OrderSectionItem height={117}>
        <View style={{ flex: 1 }}>
          <OrderButtonInput
            onPress={onRedeemPoint}
            title={translate('txtApply')}
            btnWidth={126}
            bgColor={AppStyles.colors.accent}
            disabled={!reward_point}>
            <TextInput
              placeholder={'Vd:25, 50, 75.....'}
              style={{ paddingHorizontal: 10, flex: 1 }}
              keyboardType="numeric"
              value={reward_point}
              onChangeText={onChangeRewardPoint}
            />
          </OrderButtonInput>
          {error_point && (
            <OrderVoucherItem
              content={translate('txtErrorApplyPoint')}
              colorText={AppStyles.colors.accent}
              icon={images.icons.ic_warning}
              style={styles.styleErrorPoint}
            />
          )}
        </View>
      </OrderSectionItem>
    </OrderSection>
  );

  const renderUsePoint = () => {
    const use_amount = used_point
      ? format.jollibeeCurrency({ value: used_point?.amount })
      : 0;
    return (
      used_point?.point && (
        <View style={styles.orderSumContent}>
          <OrderVoucherItem
            content={`${translate('txtChange')} ${
              used_point?.point
            } ${translate('txtEarnPoint')} ${use_amount}.`}
            style={{
              justifyContent: 'flex-end',
            }}
          />

          <Text style={styles.txtSubPriceStyle}>-{use_amount}</Text>
        </View>
      )
    );
  };

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.container}>
      <SinglePageLayout>
        <SafeAreaView style={styles.content}>
          {/**Shipping Type */}
          {shippingMethod?.results && renderShippingTypeSection()}
          {/**Shipping Info */}
          {renderAddressShippingSection()}
          {/**Order Items List*/}
          {renderProductItem()}
          {/**Order Extra List*/}
          {renderExtraItems()}
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
          {renderPromotion()}
          {/**Points */}
          {renderPoint()}
        </SafeAreaView>
      </SinglePageLayout>

      {/**summary */}
      <View style={styles.confirmStyle}>
        <View style={styles.orderSumContent}>
          <Text style={styles.txtStyle}>
            {translate('txtOrderCalculator')}:
          </Text>
          <Text style={styles.txtSubPriceStyle}>{subTotal}</Text>
        </View>
        {applied_coupons && (
          <View style={styles.orderSumContent}>
            <Text style={styles.txtStyle}>{translate('tabPromotion')} : </Text>
            {applied_coupons && (
              <OrderVoucherItem
                content="Voucher ưu đãi 30K"
                style={{
                  paddingHorizontal: 0,
                }}
              />
            )}
            <Text style={styles.txtSubPriceStyle}>{_discount}</Text>
          </View>
        )}
        {renderUsePoint()}
        <View style={styles.orderSumContent}>
          <Text style={styles.txtTitleStyle}>
            {translate('txtGrandTotal')} :
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.txtPointStyle}>
              {`(+ ${bonus_point} ${translate('txtPoint')})`}
            </Text>
            <Text style={styles.txtPriceStyle}>{total}</Text>
          </View>
        </View>
        <ButtonCC.ButtonRed
          label={translate('txtConfirm')}
          onPress={onSubmit}
        />
      </View>

      {/**Popup Notice */}
      {showNotice && (
        <PopupNoticeEnvironment
          visible={showNotice}
          onToggle={onTogglePopupNotice}
        />
      )}

      {/**Popup Order Success */}
      <PopupOrderSuccess
        visible={showPopupSuccess}
        onToggle={onTogglePopupSuccess}
        orderCode={order_number}
      />

      <Loading isLoading={updateCartResp?.loading} />
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

  imgShippingStyle: {
    height: 42,
    width: 42,
    marginRight: 10,
  },

  txtNoteStyle: {},

  buttonHeaderStyle: { width: scaleWidth(122), height: scaleHeight(55) },

  headerButtonTextStyle: {
    fontSize: 14,
    color: '#1B1B1B',
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
  styleErrorPoint: {
    paddingHorizontal: 0,
    paddingRight: 10,
    flex: 0,
    marginTop: 5,
    alignItems: 'flex-start',
  },
});

export default OrderScreen;
