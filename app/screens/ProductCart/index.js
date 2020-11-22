import { CustomFlatList, Loading } from '@components';
import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  RefreshControl,
  Text,
} from 'react-native';
import { ButtonCC, OrderItem, OrderItemLoading } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ScreenName from '../ScreenName';
import { useMutation } from '@apollo/client';
import { GEX, query } from '@graphql';
import { format, scale } from '@utils';
import * as Widget from './widget';
import { useComponentSize } from '@hooks';

const { scaleWidth } = scale;

const ProductCart = ({ visible, onToggle }) => {
  const navigation = useNavigation();
  const popupRef = React.createRef(null);

  const cart_id = useSelector((state) => state.account?.user?.cart_id);

  const [refreshing, setRefreshing] = React.useState(false);
  const [cartDetail, setCartDetail] = React.useState(null);

  const [footerSize, onLayoutFooter] = useComponentSize();
  const customerCart = useSelector((state) => state.account?.cart);

  // Mutation update cart product
  // const [updateCartItems, response] = useMutation(mutation.UPDATE_CART_PRODUCT);
  const { updateCartItems, updateCartResp } = GEX.useUpdateCustomerCart();

  // Mutation update cart product --
  const onRenderItem = ({ item }, index) => {
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

  const handleRefresh = () => {
    setRefreshing(true);
    // refetch();
    // getCheckOutCart();

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // ========= ORDER PROCESS
  const orderButtonPressed = () => {
    navigation.navigate(ScreenName.Menu);
    popupRef.current.forceQuit();
  };

  // ========= PAYMENT PROCESS
  const paymentButtonPressed = () => {
    navigation.navigate(ScreenName.Order);
    popupRef.current.forceQuit();
  };

  const updateMyCart = async (item) => {
    let input = {
      cart_id: cart_id,
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
      productItem: item?.product,
    });
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

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <View style={styles.container}>
        {/**Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => popupRef.current.forceQuit()}>
            <Image source={images.icons.ic_popup_close} resizeMode="center" />
          </TouchableOpacity>
          <Text style={styles.txtHeader}>{`${translate(
            'txtProductCart',
          ).toUpperCase()}`}</Text>
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
                (+ {format.caculatePoint(cartDetail?.items)}{' '}
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
    height: 54,
    padding: 5,
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
