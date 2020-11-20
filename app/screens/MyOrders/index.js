import { GCC } from '@graphql';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images, metrics } from '@theme';
import { format, statusOrder, scale } from '@utils';
import moment from 'moment';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Fade, Placeholder, PlaceholderLine } from 'rn-placeholder';
import ScreenName from '../ScreenName';
import { CustomImageBackground } from '@components';
import { ButtonCC } from '../components';
const { scaleWidth, scaleHeight } = scale;
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
    const status_style = {
      ...AppStyles.fonts.bold,
      color: statusOrder.getColor(status_text),
      fontSize: 14,
    };
    return (
      <TouchableOpacity onPress={goToDetail(item)} style={styles.itemContainer}>
        <Image source={images.icons.ic_order} />
        <View style={styles.itemSubContainer}>
          <View style={styles.grandTotalContainer}>
            <Text style={styles.txtPrice}>{'215.000đ'}</Text>
            <Text style={AppStyles.fonts.mini}>2 món</Text>
          </View>

          <Text style={AppStyles.fonts.medium}>
            Đơn hàng #{item.order_number}
          </Text>
          <Text style={styles.txtDate}>{getDateStatus(item.created_at)}</Text>
          <Text numberOfLines={1} style={styles.txtAddress}>
            <Text style={{ fontWeight: 'bold' }}>
              {getShippingMethod(item.shipping_method)}
            </Text>
            :{' ' + item.address}
          </Text>

          <View style={styles.bottomContainer}>
            <Text numberOfLines={1} style={status_style}>
              {status_text}
            </Text>

            {/* ----- BUTTON ĐAT LAI -----  */}
            {status_text === 'Hoàn thành' && (
              <ButtonCC.ButtonBorderRed
                label="Đặt lại"
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
    fontSize: 14,
    fontWeight: 'normal',
    paddingVertical: 4,
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
