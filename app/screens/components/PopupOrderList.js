import { CustomFlatList, Loading } from '@components';
import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View, RefreshControl, Text } from 'react-native';
import { ButtonCC, OrderItem, OrderItemLoading } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenName from '../ScreenName';
import { useMutation, useQuery } from '@apollo/client';
import { mutation, query } from '@graphql';
import { format } from "@utils";
import {
  Placeholder,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

export const PopupOrderList = ({ visible, onToggle }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const popupRef = React.createRef(null);
  const [refreshing, setRefreshing] = React.useState(false)
  const cart_id = useSelector((state) => state.cart?.cart_id);
  // --------- handle fetch data cart -----------
  const { data, error, loading, refetch } = useQuery(query.CART_DETAIL, {
    variables: { cartId: cart_id },
    //  fetchPolicy: 'cache-first'
  });
  const { items, prices: { grand_total } } = data?.cart || { items: [], prices: { grand_total: {} } };

  const total = format.jollibeeCurrency(grand_total);

  // -------- handle fetch data cart -----------

  // Mutation update cart product
  const [updateCartItems, response] = useMutation(mutation.UPDATE_CART_PRODUCT);

  // Mutation update cart product --

  const renderItem = ({ item, index }) => (
    <OrderItem item={item} key={item.id + ''} shadow={false} onPress={updateCart} />
  );
  const renderEmptyList = () => (
    <View style={{ padding: 15, alignItems: 'center' }}>
      <Text style={styles.labelSum}>{error ? error : 'Không có sản phẩm'}</Text>
    </View>
  );

  const renderTotalLoading = () => (
    <Placeholder
      Animation={Fade}
      style={{width:100}}>
      <View style={{alignItems:'flex-end',justifyContent:'center',marginTop:10}}>
        <PlaceholderLine width={90} />
        <PlaceholderLine width={50} />
      </View>
    </Placeholder>
  )

  const handleRefresh = () => {
    setRefreshing(true);
    refetch();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const orderPressed = () => {
    popupRef.current.forceQuit();
  };

  const paymentPressed = () => {
    navigation.navigate(ScreenName.Order);
    popupRef.current.forceQuit();
  };

  const updateCart = React.useCallback(
    async (item) => {
      let input = {
        "cart_id": cart_id,
        "cart_item_id": item.id,
        "quantity": item.quantity
      }

      await updateCartItems({
        variables: input,
        update: (store, { data: { updateCartItems } }) => {
          const existingCarts = store.readQuery({ query: query.CART_DETAIL, variables: { cartId: cart_id } });
          if (existingCarts.cart && updateCartItems.cart) {
            existingCarts.cart['prices'] = updateCartItems.cart['prices']
            store.writeQuery({
              query: query.CART_DETAIL,
              data: { cart: existingCarts.cart }
            });
          }

        }
      });
    },
    [dispatch],
  );

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeButtonStyle}
            onPress={() => popupRef.current.forceQuit()}>
            <Image source={images.icons.ic_close_blur} />
          </TouchableOpacity>
          <Text style={styles.txtHeader}>Phần ăn đã chọn</Text>
        </View>
        <View style={styles.bodyList}>
          {
            <CustomFlatList
              data={loading ? [1, 2, 3, 4] : items}
              renderItem={loading ? OrderItemLoading : renderItem}
              keyExtractor={(item, index) => index + ''}
              ItemSeparatorComponent={() => (
                <View style={AppStyles.styles.rowSeparator} />
              )}
              contentContainerStyle={styles.contentContainerStyle}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
              }
              ListEmptyComponent={renderEmptyList}
            />}
        </View  >
        <View style={styles.bottomContent}>
          <View style={AppStyles.styles.horizontalLayout}>
            <Text style={styles.labelSum}>{translate('txtSummary')} :</Text>
            {loading ?
              renderTotalLoading()
              :
              <View style={styles.priceContent}>
                <Text style={styles.priceStyle}>{total}</Text>
                <Text style={styles.pointStyle}>(+ {format.caculatePoint(items)} điểm)</Text>
              </View>
            }
          </View>
          <View style={AppStyles.styles.horizontalLayout}>
            <ButtonCC.ButtonYellow
              label={translate('txtOrderMore')}
              style={styles.bottomButton}
              onPress={orderPressed}
            />
            <ButtonCC.ButtonRed
              label={translate('txtPayment')}
              style={styles.bottomButton}
              onPress={paymentPressed}
            />
          </View>
        </View>
      </View>

      <Loading isLoading={response.loading} />
    </PopupLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '90%',
    maxHeight: '90%',
    backgroundColor: '#fff',
    paddingBottom: 150,
  },

  header: {
    width: '100%',
    height: 50,
    backgroundColor: AppStyles.colors.button,
    ...AppStyles.styles.horizontalLayout,
    flex: 0,
  },

  closeButtonStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#fff',
    borderWidth: 2,
    backgroundColor: AppStyles.colors.accent,
    marginLeft: 10,
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtHeader: {
    ...AppStyles.fonts.header,
    fontSize: 24,
    flex: 1,
    textAlign: 'center',
  },

  bodyList: {
    backgroundColor: '#fff',
    minHeight: 300,
  },

  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#707070',
    paddingHorizontal: 10,
  },

  bottomButton: {
    width: '48%',
    height: 44,
  },

  labelSum: {
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

  contentContainerStyle: { paddingBottom: 20 },
});
