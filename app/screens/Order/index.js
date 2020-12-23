/* eslint-disable react-native/no-inline-styles */
import { useLazyQuery, useMutation } from '@apollo/client';
import { CustomImageBackground, CustomSwitch, Loading } from '@components';
import { GEX, GQL, query, useGraphQLClient } from '@graphql';
import { useStorePickup } from '@hooks';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { account, app, order } from '@slices';
import { AppStyles, images } from '@theme';
import { format, scale, appUtil } from '@utils';
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
import NavigationService from '../../navigation/NavigationService';
import {
  ButtonCC,
  OrderNewItem,
  PopupNoticeEnvironment,
  PopupOrderSuccess,
} from '../components';
import ScreenName from '../ScreenName';
import {
  CustomScrollViewHorizontal,
  OrderButtonInput,
  OrderItem,
  OrderSection,
  OrderSectionItem,
  OrderVoucherItem,
} from './widget';
// import { removeVoucherFromCart } from './controllers';
import { distanceMatrix } from '@location';
import _ from 'lodash';

const { scaleWidth, scaleHeight } = scale;

const ShippingType = {
  InShop: 'storepickup',
  InPlace: 'freeshipping',
};

const COUNTDOWN_SECONDS = 30;
const CONFIRM_HEIGHT = 150;
const MINIUM_POINT = 250;
const SUB_MENU_ID = 4;

const OrderScreen = ({ route = { params: {} } }) => {
  const { shippingMethod, addressParams } = route.params || {};

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
  const pickupStores = useSelector((state) => state.store?.pickupStores);
  const shippingLocation = useSelector((state) => state.store.shippingLocation);

  // show dialog notice
  const [showNotice, setShowNotice] = React.useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = React.useState(false);
  const [coupon_code, setCouponCode] = React.useState('');
  const [voucherCode, setVoucherCode] = React.useState('');
  const [reward_point, setRewardPoint] = React.useState('');
  const [order_number, setOrderNumber] = React.useState('');
  const [error_point, showErrorPoint] = React.useState(null);
  const [availableStores, setAvailableStores] = React.useState(null);

  // ----------------- Timming apply coupon ------------------------ //
  const onCallBackEndCountDown = () => {
    dispatch(account.toggleTimmer());
    dispatch(account.setCountInputCoupon(5));
  };
  // const { second, startTimer } = useCountDown({
  //   callBackEnd: onCallBackEndCountDown,
  // });
  // ----------------- Timming apply coupon ------------------------ //

  const storeList = useStorePickup();

  // =================================
  // id dung cho store pickup
  const store_pickup_id = useSelector(
    (state) => state.order?.pickup_location_code,
  );
  const [assignStoreId, setAssignStoreId] = React.useState(null);

  // --------- CUSTOMER CART -----------
  const [customerCart, getCustomerCart] = GEX.useGetCustomerCart();
  const [, getCustomerInfo] = GEX.useCustomer();

  const {
    items,
    applied_coupons,
    applied_vouchers,
    prices,
    shipping_addresses,
    bonus_point = 0,
    used_point = 0,
  } = customerCart || {};

  const { grand_total, discounts, subtotal_excluding_tax } = prices || {};
  const total = format.jollibeeCurrency({
    value: grand_total?.value,
    currency: 'VND',
  });
  const _discount = format.jollibeeCurrency(discounts ? discounts?.amount : {});
  const subTotal = format.jollibeeCurrency(
    subtotal_excluding_tax ? subtotal_excluding_tax : {},
  );

  const shippingAddress = shipping_addresses?.find(Boolean);
  const {
    firstname = '',
    lastname = '',
    selected_shipping_method = { method_code: ShippingType.InPlace },
    telephone = '',
  } = shippingAddress || {};
  const { method_code } = selected_shipping_method || {};
  const full_address = format.addressFull(shippingAddress) ?? '';

  const [customerInfo] = GEX.useCustomer();
  const [shippingType, setShippingType] = React.useState(null);
  // const [appliedVouchers, setAppliedVouchers] = React.useState(
  //   applied_vouchers,
  // );
  const [, getOrderList] = GEX.useOrderList();

  // update cart product
  const [updateCartResp, updateCart] = GEX.useUpdateCustomerCart();
  // add voucher

  const [, removeVoucher] = GEX.useRemoveVoucherFromCart();
  const [, addVoucherToCart] = GEX.useApplyVoucherToCart();

  // Call get món đi kèm
  const [getSubMenu, responseMenu] = useLazyQuery(GQL.MENU_DETAIL_LIST, {
    variables: { categoryId: SUB_MENU_ID },
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

    updateCart({
      variables: input,
    });
  };

  const onChangeCouponCode = (val) => setVoucherCode(val);
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
  const onEditAddressShipping = () => {
    if (shippingType === ShippingType.InShop) {
      navigation.navigate(ScreenName.StorePickup, {
        stores: availableStores,
      });

      dispatch(order.pickupStore(null));
    } else {
      navigation.navigate(ScreenName.MyAddress, { selected_address: true });
    }
  };

  /**
   * SET SHIPPING METHOD
   * @param {*} code : ["freeshipping", "storepickup"]
   */
  const onChangeShippingMethod = (code) => {
    switch (code) {
      case ShippingType.InShop:
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
        dispatch(order.pickupStore(null));

        navigation.navigate(ScreenName.StorePickup, {
          stores: arr,
        });
        setAvailableStores(arr);

        break;
      default:
        dispatch(order.pickupStore(null));
        setShippingType(ShippingType.InPlace);

        break;
    }
  };

  const onApplyCoupon = () => {
    addVoucherToCart({
      variables: {
        cart_id: customerCart?.id,
        voucher_code: voucherCode,
      },
    });

    setVoucherCode(null);
  };

  const onPlaceOrderComplete = (placeOrderResult) => {
    const { reachedMaxPendingOrder } = placeOrderResult;
    if (reachedMaxPendingOrder) {
      NavigationService.alert({
        title: translate('txtMaxNumOrderPendingTitle'),
        message: translate('txtMaxNumOrderPendingDesc'),
      });
    } else {
      setShowPopupSuccess(true);
      showErrorPoint(false);
      setOrderNumber(placeOrderResult?.order?.order_number);

      getCustomerCart();
    }
  };

  // submit checkout
  const [, orderSubmit] = GEX.usePlaceOrder(onPlaceOrderComplete);

  const removeVoucherItem = (code) => {
    removeVoucher({
      variables: {
        cart_id: customerCart?.id,
        voucher_code: code,
      },
    });
  };

  const onSubmit = () => {
    dispatch(order.pickupStore(null));
    orderSubmit({
      variables: {
        cart_id: customerCart?.id,
        // restaurant_id: assignStoreId,
      },
    });
  };

  const onRedeemPoint = () => {
    if (+reward_point >= MINIUM_POINT) {
      let remainder = reward_point % MINIUM_POINT;
      let use_point = reward_point - remainder;
      dispatch(app.showLoading());
      redeemCustomerPoint(use_point).then((res) => {
        if (res?.data?.useCustomerPoint) {
          // getCheckOutCart();
          getCustomerCart();
          getCustomerInfo();

          setRewardPoint('');
          showErrorPoint(false);
        }
        dispatch(app.hideLoading());
      });
    } else {
      showErrorPoint(true);
    }
  };

  const onRemovePoint = () => {
    dispatch(app.showLoading());
    redeemCustomerPoint(0).then((res) => {
      if (res?.data?.useCustomerPoint) {
        // getCheckOutCart();
        getCustomerCart();
        getCustomerInfo();

        setRewardPoint('');
        showErrorPoint(false);
      }
      dispatch(app.hideLoading());
    });
  };

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setShowNotice(isEatingUtensils);
  //   }, 1000);
  // }, [isEatingUtensils]);

  React.useEffect(() => {
    getSubMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const callSetShippingMethod = async () => {
      const { variables } = addressParams;
      Logger.debug(addressParams, '========> addressParams');

      await dispatch(app.showLoading());
      await setShippingAddress({ variables });
      await setShippingMethods(ShippingType.InShop, parseInt(store_pickup_id));
      setAssignStoreId(store_pickup_id);
      await dispatch(app.hideLoading());
    };

    if (!_.isEmpty(addressParams) && store_pickup_id) {
      setShippingType(ShippingType.InShop);
      callSetShippingMethod();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store_pickup_id, addressParams]);

  React.useEffect(() => {
    const selectTheStore = async () => {
      let pickStoreId = pickupStores.find(Boolean);
      Logger.debug(pickupStores, '=======> pickupStores');

      //!! Find store follow distance, tam thoi ko dung
      if (pickupStores?.length > 1 && shippingLocation) {
        const origins = `${shippingLocation?.latitude},${shippingLocation?.longitude}`;
        let destinations = '';
        pickupStores?.forEach((x) => {
          const findStore = storeList?.find(
            (findX) => x?.store_id === findX?.id,
          );
          if (findStore) {
            destinations = `${findStore.latitude},${findStore.longitude}|${destinations}`;
          }
        });
        let { status, data } = await distanceMatrix({ origins, destinations });
        Logger.debug(status, '=======> status');

        if (data?.length > 0) {
          const getStoreIndex = appUtil.getNearStore(data);
          Logger.debug(getStoreIndex, '=======> getStoreIndex');

          if (getStoreIndex >= 0 && pickupStores.length > getStoreIndex) {
            pickStoreId = pickupStores[getStoreIndex]?.store_id;
            Logger.debug(pickStoreId, '=======> pickStoreId');
          }
        }
      }

      // const listStore = ['33', '3', '2'];
      // !! hard code 3 store_id
      // const hard_code = listStore.sort(() => Math.random() - 0.5);
      // let store_id = hard_code?.find(Boolean);

      // const findStoreId = hard_code.find((storeId) => {
      //   const findIdex = pickupStores?.findIndex((x) => x.store_id === storeId);

      //   if (findIdex >= 0) return storeId;
      // });

      // if (findStoreId !== null) {
      //   store_id = findStoreId;
      // }

      // store_id = '33';

      setAssignStoreId(pickStoreId);

      setShippingMethods(ShippingType.InPlace, pickStoreId);
    };

    if (shippingType === ShippingType.InPlace && storeList) {
      if (pickupStores?.length > 0 && !_.isEmpty(shippingLocation)) {
        selectTheStore();
      } else {
        NavigationService.alert({
          title: translate('txtAlert'),
          message: translate('txtNotFoundStoreAddress'),
        });

        setShippingType(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupStores, shippingType, shippingLocation, storeList]);

  // React.useEffect(() => {}, []);

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
    const color = AppStyles.colors.moderate_cyan;
    const icon = images.icons.ic_sticked;

    return (
      <OrderButtonInput
        key={index + ''}
        icon={images.icons.ic_delete}
        btnWidth={scaleWidth(43)}
        height={scaleHeight(40)}
        width={scaleWidth(200)}
        borderColor={color}
        bgColor={color}
        style={{ marginRight: 5 }}
        onPress={() => {
          removeVoucherItem(item.code);
        }}>
        <OrderVoucherItem
          content={`${translate('txtVoucher')} ${Math.round(
            item.discount_amount / 1000,
          )}k `}
          colorText={color}
          icon={icon}
        />
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

  const renderAddressShippingSection = () => {
    let pickStore = null;
    if (shippingType === ShippingType.InShop) {
      pickStore = availableStores?.find((x) => x.id === assignStoreId);
    }

    return (
      <OrderSection
        title={`${translate('txtShippingInfo')}`.toUpperCase()}
        key="ShippingInfo"
        buttonComponent={() => (
          <ButtonCC.ButtonYellow
            label={translate('txtEdit')}
            style={styles.buttonHeaderStyle}
            textStyle={styles.headerButtonTextStyle}
            onPress={onEditAddressShipping}
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
                : translate('txtAddress')}
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
        {shippingType === ShippingType.InShop && pickStore && (
          <OrderSectionItem>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}>
              <Text style={[styles.txtTitleStyle, { flex: 0 }]}>
                {translate('txtToReceive') + ': '}
              </Text>
              <Text
                style={[styles.txtStyle, { flex: 1 }]}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {pickStore?.name + ' - ' + pickStore?.vietnamese_address}
              </Text>
            </View>
          </OrderSectionItem>
        )}
        <OrderSectionItem height={78}>
          <TextInput
            placeholder={translate('txtNoteShipping')}
            multiline={true}
            style={styles.txtNoteStyle}
          />
        </OrderSectionItem>
      </OrderSection>
    );
  };

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
  //       {translate('txtTryAgain') + ' (' + second + ') '}
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
      <OrderSectionItem height={scale.scaleHeight(70)}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: scaleHeight(20),
          }}>
          <OrderButtonInput
            onPress={onApplyCoupon}
            disabled={!voucherCode || timming}
            title={translate('txtApply')}
            btnWidth={126}
            bgColor={AppStyles.colors.accent}>
            <TextInput
              placeholder={translate('txtInputVoucher')}
              style={{ paddingHorizontal: 10, flex: 1 }}
              value={voucherCode}
              onChangeText={onChangeCouponCode}
            />
          </OrderButtonInput>
          {/* {renderBlockedApplyCoupon()} */}
          {applied_vouchers && (
            <View
              style={{
                height: scale.scaleHeight(40),
                marginTop: scale.scaleHeight(10),
                justifyContent: 'center',
              }}>
              <CustomScrollViewHorizontal
                data={applied_vouchers?.list}
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
              placeholder={'500, 1000, 1500.....'}
              style={{ paddingHorizontal: 10, flex: 1 }}
              keyboardType="numeric"
              value={reward_point}
              onChangeText={onChangeRewardPoint}
            />
          </OrderButtonInput>
          {used_point?.point > 0 && (
            <View
              style={{
                height: scale.scaleHeight(40),
                marginTop: scale.scaleHeight(10),
                justifyContent: 'center',
              }}>
              <OrderButtonInput
                icon={images.icons.ic_delete}
                btnWidth={scaleWidth(43)}
                height={scaleHeight(40)}
                width={scaleWidth(200)}
                borderColor={AppStyles.colors.moderate_cyan}
                bgColor={AppStyles.colors.moderate_cyan}
                style={{ marginRight: 5 }}
                onPress={onRemovePoint}>
                <OrderVoucherItem
                  content={`${translate('txtRedeemPoint')} ${
                    used_point?.point
                  } = ${format.jollibeeCurrency({
                    value: used_point?.amount,
                  })} `}
                  colorText={AppStyles.colors.moderate_cyan}
                  icon={images.icons.ic_sticked}
                />
              </OrderButtonInput>
            </View>
          )}
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
      used_point?.point > 0 && (
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
        {applied_vouchers && (
          <View style={styles.orderSumContent}>
            <Text style={styles.txtStyle}>{translate('tabPromotion')} : </Text>
            {applied_vouchers && (
              <View>
                {applied_vouchers?.list?.map((x) => (
                  <OrderVoucherItem
                    content={`${translate(
                      'txtVoucher',
                    )} ${format.jollibeeCurrency({
                      value: x?.discount_amount,
                    })}`}
                    style={{
                      paddingHorizontal: 0,
                    }}
                  />
                ))}
              </View>
            )}
            <Text style={styles.txtSubPriceStyle}>
              {`-${format.jollibeeCurrency({
                value: applied_vouchers?.total_discount_amount,
              })}`}
            </Text>
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
