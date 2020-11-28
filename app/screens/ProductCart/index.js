import { CustomFlatList, Loading } from '@components';
import { GEX, query, GQL } from '@graphql';
import { useComponentSize } from '@hooks';
import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import { format, scale } from '@utils';
import React from 'react';
import { isEmpty } from 'lodash';
import {
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ButtonCC, OrderItem } from '../components';
import ScreenName from '../ScreenName';
import * as Widget from './widget';

const { scaleWidth } = scale;

const ProductCart = ({ visible, onToggle }) => {
  const navigation = useNavigation();
  const popupRef = React.useRef(null);

  const [refreshing, setRefreshing] = React.useState(false);
  const [cartDetail, setCartDetail] = React.useState(null);
  const [footerSize, onLayoutFooter] = useComponentSize();

  // GET
  const customerCart = useSelector((state) => state.account?.cart);

  const { customer } = GEX.useCustomer();
  const addresses = customer?.addresses ?? [];
  const address_id = addresses?.find((x) => x.default_shipping)?.id;
  const params = {
    variables: {
      shipping_addresses: [{ customer_address_id: address_id }],
    },
  };

  const { getCheckOutCart, getCheckOutCartResp } = GEX.useGetCheckOutCart();

  // cần get ra để nhét default value vào
  const { shipping_addresses, selected_payment_method, billing_address } =
    getCheckOutCartResp?.data?.cart || {};

  const {
    getShippingMethod,
    getShippingMethodResp,
  } = GEX.useGetShippingMethod();

  // MUTATION
  const { updateCartItems, updateCartResp } = GEX.useUpdateCustomerCart();
  const {
    setShippingAddresses,
    setShippingAddressesOnCartResp,
  } = GEX.useSetShippingAddress();

  const {
    setBillingAddressOnCart,
    setBillingAddressOnCartResp,
  } = GEX.useSetBillingAddress();

  const {
    setPaymentMethod,
    setPaymentMethodOnCartResp,
  } = GEX.useSetPaymentMethod();

  const handleRefresh = () => {
    setRefreshing(true);
    // refetch();
    // getCheckOutCart();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const isPaymentWaiting = () => {
    return (
      setShippingAddressesOnCartResp.loading ||
      setBillingAddressOnCartResp.loading ||
      setPaymentMethodOnCartResp.loading ||
      getShippingMethodResp.loading
    );
  };

  const closePopup = () => {
    // Khi khong process to server moi cho quit, dùng để set default  khi tiến hành thanh toán
    if (!isPaymentWaiting()) {
      popupRef.current.forceQuit();
    }
  };

  // ========= ORDER PROCESS
  const orderButtonPressed = () => {
    if (!isPaymentWaiting()) {
      navigation.navigate(ScreenName.Menu);
      popupRef.current.forceQuit();
    }
  };

  const orderCreateNewAddress = () => {
    popupRef.current.forceQuit();
    navigation.navigate(ScreenName.DetailMyAddress, {
      titleHeader: translate('txtMyAddressDetail'),
      cartId: customerCart?.id,
    });
  };

  // ========= PAYMENT PROCESS

  const paymentButtonPressed = () => {
    if (!address_id) {
      orderCreateNewAddress();
    } else getShippingMethod();
  };

  React.useEffect(() => {
    if (!getShippingMethodResp.data) return;

    const setDefaultValue = async () => {
      if (isEmpty(shipping_addresses) && address_id) {
        Logger.debug(shipping_addresses, 'shipping_addresses');

        await setShippingAddresses(params);
      }

      if (isEmpty(billing_address) && address_id) {
        Logger.debug(billing_address, 'billing_address');
        await setBillingAddressOnCart(address_id);
      }

      if (isEmpty(selected_payment_method?.code)) {
        Logger.debug(selected_payment_method, 'selected_payment_method');

        await setPaymentMethod();
      }
    };

    setDefaultValue();
    if (!isPaymentWaiting()) {
      navigation.navigate(ScreenName.Order, {
        ...getShippingMethodResp.data,
        addressParams: params,
      });
      popupRef.current.forceQuit();
    } else {
      setTimeout(() => {
        navigation.navigate(ScreenName.Order, {
          ...getShippingMethodResp.data,
          addressParams: params,
        });
        popupRef.current.forceQuit();
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getShippingMethodResp.data]);

  const updateMyCart = async (item) => {
    let input = {
      cart_item_id: item.id,
      quantity: item.quantity,
    };

    await updateCartItems({
      variables: input,
    });
  };

  const onShowCartItem = (item) => {
    popupRef.current.forceQuit();

    navigation.navigate(ScreenName.MenuItemDetail, {
      product: item?.product,
      detailItem: item,
    });
  };

  const onRenderItem = ({ item }) => {
    return (
      <OrderItem
        item={item}
        key={item.id + ''}
        shadow={false}
        updateQty={updateMyCart}
        onPress={() => {
          onShowCartItem(item);
        }}
      />
    );
  };

  React.useEffect(() => {
    if (customerCart) {
      const {
        items = [],
        prices: { grand_total },
      } = customerCart;

      const total = format.jollibeeCurrency(grand_total);

      setCartDetail({ items, total });
    }
  }, [customerCart]);

  React.useEffect(() => {
    getCheckOutCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PopupLayout
      visible={visible}
      onToggle={onToggle}
      ref={popupRef}
      disableBackdrop={true}>
      <View style={styles.container}>
        {/**Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.btnClose} onPress={closePopup}>
            <Image source={images.icons.ic_popup_close} resizeMode="center" />
          </TouchableOpacity>
          <Text style={styles.txtHeader}>
            {translate('txtProductCart').toUpperCase()}
          </Text>
        </View>

        {/**Content List */}
        <CustomFlatList
          style={styles.bodyList}
          data={cartDetail?.items}
          renderItem={onRenderItem}
          keyExtractor={(item, index) => index + ''}
          contentContainerStyle={{ paddingBottom: footerSize?.height }}
          ItemSeparatorComponent={() => (
            <View style={AppStyles.styles.rowSeparator} />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Widget.EmptyCartList error={translate('txtEmptyCartList')} />
          }
        />
        {/**Footer */}
        <View style={styles.footer} onLayout={onLayoutFooter}>
          {/**Price Summary*/}
          <View style={AppStyles.styles.horizontalLayout}>
            <Text style={styles.txtSummary}>{translate('txtSummary')} :</Text>
            <View style={styles.priceContent}>
              <Text style={styles.priceStyle}>{cartDetail?.total}</Text>
              <Text style={styles.pointStyle}>
                (+ {format.caculatePoint(cartDetail?.items)}
                {translate('txtPoint')})
              </Text>
            </View>
          </View>

          {/**Button Actions */}
          <View style={[AppStyles.styles.horizontalLayout, styles.btnActions]}>
            {/**Order */}
            <ButtonCC.ButtonYellow
              label={translate('txtOrderMore')}
              style={styles.btnProceeds}
              onPress={orderButtonPressed}
            />

            {/**Payment */}
            <ButtonCC.ButtonRed
              label={translate('txtPayment')}
              style={styles.btnProceeds}
              onPress={paymentButtonPressed}
              loading={isPaymentWaiting()}
              disabled={isEmpty(cartDetail?.items)}
            />
          </View>
        </View>
      </View>
      <Loading isLoading={updateCartResp?.loading} />
    </PopupLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '90%',
    maxHeight: '80%',
    minHeight: '60%',
    borderRadius: 14,
    overflow: 'hidden',
  },

  header: {
    width: '100%',
    height: 67,
    backgroundColor: AppStyles.colors.button,
    ...AppStyles.styles.horizontalLayout,
    flex: 0,
  },

  btnClose: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtHeader: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    fontSize: scaleWidth(24),
    flex: 1,
    textAlign: 'center',
  },

  bodyList: {
    backgroundColor: '#fff',
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#707070',
    paddingHorizontal: 10,
    paddingTop: 10,
  },

  btnProceeds: {
    width: '45%',
  },

  txtSummary: {
    ...AppStyles.fonts.text,
    fontSize: 16,
    color: '#1B1B1B',
  },

  priceStyle: {
    ...AppStyles.fonts.title,
    color: AppStyles.colors.accent,
    fontSize: 21,
  },

  pointStyle: {
    ...AppStyles.fonts.medium,
    fontSize: 12,
    color: '#484848',
  },

  priceContent: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },

  containerLoading: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginTop: 10,
  },

  btnActions: {
    width: '100%',
    marginTop: 10,
  },
});

export default ProductCart;
