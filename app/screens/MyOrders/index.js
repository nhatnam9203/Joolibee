import { GCC, GEX } from '@graphql';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images, metrics } from '@theme';
import { format, statusOrder, scale, appUtil } from '@utils';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import ScreenName from '../ScreenName';
import { CustomImageBackground } from '@components';
import { translate } from '@localize';
import { ButtonCC } from '../components';
import { useDispatch } from 'react-redux';
import { app } from '@slices';
import { useStorePickup } from '@hooks';

const { scaleWidth, scaleHeight } = scale;
const Index = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const storeList = useStorePickup();

  // --------------- Re Order Items Cart ----------------- //
  const onReOderSuccess = () => {
    navigation.navigate(ScreenName.NewHome);
    setTimeout(() => {
      dispatch(app.showOrderList());
    }, 1000);
  };
  const [reOrderCart] = GEX.useReOrderCart(onReOderSuccess);

  const onHandleReOrder = (number) => () => {
    reOrderCart(number);
  };
  // --------------- Re Order Items Cart End ----------------- //

  const goToDetail = (item) => {
    navigation.navigate(ScreenName.DeitalOrders, {
      order: { ...item, status: item.status?.toLowerCase() },
    });
  };

  const renderAddressShipper = ({ shipping_method, address, store_name }) => {
    switch (shipping_method) {
      case 'freeshipping_freeshipping':
      case 'Giao hàng tận nơi':
        if (!address) return <View />;
        return (
          <Text numberOfLines={1} style={styles.txtAddress}>
            <Text style={{ fontWeight: 'bold' }}>
              {translate('txtDeliveredTo')}
            </Text>
            : {address}
          </Text>
        );
      default:
        if (store_name && storeList) {
          return (
            <Text numberOfLines={1} style={styles.txtAddress}>
              <Text style={{ fontWeight: 'bold' }}>
                {translate('txtToReceive')}
              </Text>
              :
              {store_name +
                '-' +
                appUtil.getSoreByName(storeList, store_name)
                  ?.vietnamese_address}
            </Text>
          );
        }
        return <View />;
    }
  };

  const getDateStatus = (date) => {
    const current_day = moment().format('DD/MM/yyyy');
    let dateOrder = format.dateTime(date);
    return dateOrder === current_day ? translate('txtToday') : dateOrder;
  };

  const renderItemLoading = () => (
    <Placeholder
      Animation={Fade}
      style={styles.containerLoading}
      Left={() => <PlaceholderLine style={styles.avatarPlaceholder} />}
      Right={() => (
        <View style={styles.rightContainerLoading}>
          <PlaceholderLine />

          <PlaceholderLine width={50} />
        </View>
      )}>
      <View style={styles.contentLoading}>
        <PlaceholderLine width={60} />
        <PlaceholderLine width={30} style={styles.txtDate} />

        <PlaceholderLine />

        <PlaceholderLine width={30} />
      </View>
    </Placeholder>
  );

  const renderItem = ({ item }) => {
    const {
      grand_total,
      order_number,
      status,
      store_name,
      address,
      created_at,
      shipping_method,
    } = item || {};
    const status_text = statusOrder.convertStatusOrder(status);
    const status_style = {
      ...AppStyles.fonts.bold,
      color: statusOrder.getColor(status_text),
      fontSize: 14,
    };

    const viewDetailItem = () => {
      goToDetail(item);
    };
    return (
      <TouchableOpacity onPress={viewDetailItem} style={styles.itemContainer}>
        <Image source={images.icons.ic_order} />
        <View style={styles.itemSubContainer}>
          <View style={styles.grandTotalContainer}>
            <Text style={styles.txtPrice}>
              {grand_total && format.jollibeeCurrency({ value: grand_total })}
            </Text>
            {/* <Text style={AppStyles.fonts.mini}>
              {items?.length || 0} {translate('txtDish')}
            </Text> */}
          </View>

          <Text style={AppStyles.fonts.medium}>
            {translate('txtOrderNumber')} #{order_number}
          </Text>
          <Text style={styles.txtDate}>{getDateStatus(created_at)}</Text>
          {renderAddressShipper(item)}

          <View style={styles.bottomContainer}>
            <Text numberOfLines={1} style={status_style}>
              {status_text}
            </Text>

            {/* ----- BUTTON ĐAT LAI -----  */}
            {status_text === translate('txtStatusOrderComplete') && (
              <ButtonCC.ButtonBorderRed
                onPress={onHandleReOrder(order_number)}
                label={translate('txtReOrder')}
                width={scaleWidth(127)}
                height={scaleHeight(44)}
              />
            )}
            {/* ----- BUTTON ĐAT LAI -----  */}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <CustomImageBackground
      style={styles.container}
      source={images.watermark_background_2}>
      <GCC.QueryOrderList
        renderItem={renderItem}
        renderItemLoading={renderItemLoading}
      />
    </CustomImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: 'transparent',
  },
  contentContainerStyle: { paddingVertical: 15 },
  statusContainer: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: 94,
    paddingVertical: 7,
  },

  itemContainer: {
    backgroundColor: '#fff',
    flex: 0,
    flexDirection: 'row',
    paddingVertical: scaleHeight(20),
    paddingHorizontal: metrics.padding + 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 14,
    ...AppStyles.styles.shadow,
  },
  grandTotalContainer: {
    alignItems: 'flex-end',
    position: 'absolute',
    top: 0,
    right: 5,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  txtDate: {
    ...AppStyles.fonts.text,
    fontSize: 14,
    marginVertical: 6,
  },
  txtPrice: {
    ...AppStyles.fonts.bold,
  },
  txtPreOrder: {
    fontSize: 14,
    textDecorationLine: 'underline',
    color: '#0696F8',
  },
  btnPreOrder: {
    position: 'absolute',
    bottom: 0,
    right: 5,
  },
  statusPlaceHolder: {
    borderRadius: 12,
    width: 94,
    height: 24,
  },
  avatarPlaceholder: {
    borderRadius: 39 / 2,
    width: 39,
    height: 39,
  },
  itemSubContainer: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    width: '90%',
  },
  contentLoading: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  txtAddress: {
    fontSize: 12,
    fontWeight: 'normal',
    paddingVertical: 4,
    ...AppStyles.fonts.text,
    color: '#484848',
  },

  containerLoading: {
    backgroundColor: '#fff',
    height: 108,
    flex: 0,
    flexDirection: 'row',
    padding: metrics.padding + 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 6,
    width: '95%',
  },
  rightContainerLoading: {
    width: 50,
    alignItems: 'flex-end',
  },
});
export default Index;
