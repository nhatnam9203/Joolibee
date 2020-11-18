import { GCC } from '@graphql';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images, metrics } from '@theme';
import { format, statusOrder } from '@utils';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import ScreenName from '../ScreenName';
import { CustomImageBackground } from '@components';
const Index = () => {
  const navigation = useNavigation();

  const goToDetail = (item) => () => {
    navigation.navigate(ScreenName.DeitalOrders, { order: item });
  };

  const getShippingMethod = (txt = '') => {
    switch (txt) {
      case 'freeshipping_freeshipping':
        return 'Giao đến';
      default:
        return 'Đến lấy';
    }
  };

  const getDateStatus = (date) => {
    const current_day = moment().format('DD/MM/yyyy');
    let dateOrder = format.date(date);
    return dateOrder === current_day ? 'Hôm nay' : dateOrder;
  };

  const renderItemLoading = () => (
    <Placeholder
      Animation={Fade}
      style={styles.containerLoading}
      Left={() => <PlaceholderLine style={styles.avatarPlaceholder} />}>
      <View style={styles.contentLoading}>
        <PlaceholderLine width={18} style={styles.txtDate} />

        <PlaceholderLine width={50} />

        <PlaceholderLine width={90} />

        <PlaceholderLine style={styles.statusPlaceHolder} />
      </View>
    </Placeholder>
  );

  const renderItem = ({ item }) => {
    const status_text = statusOrder.convertStatusOrder(item.status);
    const txt_color = status_text === 'Hoàn thành' ? '#1B1B1B' : '#FFFFFF';
    const status_style = { color: txt_color, fontWeight: '700' };
    return (
      <TouchableOpacity onPress={goToDetail(item)} style={styles.itemContainer}>
        <Image source={images.icons.ic_order} />
        <View style={styles.itemSubContainer}>
          <Text style={[AppStyles.fonts.text, styles.txtDate]}>
            {getDateStatus(item.created_at)}
          </Text>

          <Text style={AppStyles.fonts.medium}>
            Đơn hàng #{item.order_number}
          </Text>

          <Text numberOfLines={1} style={styles.txtAddress}>
            {getShippingMethod(item.shipping_method)}: {item.address}
          </Text>
          <View
            style={[
              styles.statusContainer,
              { backgroundColor: statusOrder.getColor(status_text) },
            ]}>
            <Text
              numberOfLines={1}
              style={[AppStyles.fonts.mini, status_style]}>
              {status_text}
            </Text>
          </View>

          {/* ----- BUTTON ĐAT LAI -----  */}
          {status_text === 'Hoàn thành' && (
            <TouchableOpacity style={styles.btnPreOrder}>
              <Text
                numberOfLines={1}
                style={[AppStyles.fonts.medium, styles.txtPreOrder]}>
                Đặt lại
              </Text>
            </TouchableOpacity>
          )}
          {/* ----- BUTTON ĐAT LAI -----  */}
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
    height: 108,
    flex: 0,
    flexDirection: 'row',
    padding: metrics.padding + 5,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 6,
    ...AppStyles.styles.shadow,
  },
  txtDate: {
    fontSize: 14,
    position: 'absolute',
    top: 0,
    right: 5,
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
    fontSize: 14,
    ...AppStyles.fonts.text,
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
});
export default Index;
