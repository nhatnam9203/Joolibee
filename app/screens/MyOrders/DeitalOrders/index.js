import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { AppStyles, images } from '@theme';
import { CustomImageBackground, Loading } from '@components';
import { PopupRating, ButtonCC } from '../../components';
import { statusOrder, scale, format } from '@utils';
import { GQL } from '@graphql';
import { useLazyQuery } from '@apollo/client';
import { OrderInfo, OrderProductList, OrderTotal, OrderStatus } from './pages';
const { scaleHeight, scaleWidth } = scale;
const MARGIN_LEFT = scaleWidth(15);
const MARGIN_VERTICAL = scaleHeight(20);

export default function Index({ navigation, route }) {
  const { order } = route.params;
  const [visible, setVisible] = React.useState(false);

  const { number, order_date, status, shipping_address, items, total } =
    order || {};
  let status_order = statusOrder.convertStatusOrder(status);
  let order_complete =
    status_order?.toLowerCase() === 'hoàn thành' ||
    status_order?.toLowerCase() === 'đã hủy'
      ? true
      : false;
  let hours = format.hours(order_date);
  let date = format.date(order_date);

  const onClose = () => setVisible(false);
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderTitle(),
    });
  }, [HeaderTitle, navigation]);

  const HeaderTitle = React.useCallback(
    () => (
      <View style={styles.headerTitleContainer}>
        <Text style={(AppStyles.fonts.medium_SVN, styles.headerTitle)}>
          Đơn hàng #{number}
        </Text>
        <Text style={(AppStyles.fonts.text, styles.headerSubTitle)}>
          {hours}, {date}
        </Text>
      </View>
    ),
    [date, hours, number],
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderTitle(),
    });
  }, [HeaderTitle, navigation]);

  const OrderTitle = ({ title, style }) => (
    <View
      style={[
        { marginLeft: MARGIN_LEFT, marginVertical: MARGIN_VERTICAL },
        style,
      ]}>
      <Text style={styles.orderTitle}>{title}</Text>
    </View>
  );

  const ExpectedTime = () => (
    <View style={{ marginLeft: MARGIN_LEFT }}>
      <Text style={[AppStyles.fonts.medium, { fontSize: 14 }]}>
        Nhận hàng dự kiến:
        <Text style={[AppStyles.fonts.SVN_Merge_Bold, { fontSize: 18 }]}>
          10:30
        </Text>
      </Text>
    </View>
  );

  const renderStatusComponent = () => {
    if (order_complete || status === 'pending') {
      return (
        <>
          <OrderTitle title="TRẠNG THÁI ĐƠN HÀNG" />
          <View style={styles.statusContent}>
            <OrderStatus status={status} />
          </View>
        </>
      );
    }
    return (
      <View style={styles.statusContent}>
        {!order_complete && (
          <View style={styles.imageStatusOrder}>
            <Image
              style={styles.image}
              source={statusOrder.getImage(status_order)}
            />
          </View>
        )}
        <ExpectedTime />
        <OrderTitle
          title="TRẠNG THÁI ĐƠN HÀNG"
          style={{ marginVertical: scaleHeight(5) }}
        />
        <OrderStatus status={status} />
      </View>
    );
  };
  const renderBottomComponent = () => {
    return (
      <View style={styles.bottomContainer}>
        <ButtonCC.ButtonYellow
          onPress={() => setVisible(true)}
          label={'ĐÁNH GIÁ'}
          width={scaleWidth(185)}
          height={scaleHeight(61)}
        />
        <ButtonCC.ButtonRed
          // onPress={onToggle}
          label={'ĐẶT LẠI'}
          width={scaleWidth(185)}
          height={scaleHeight(61)}
        />
      </View>
    );
  };
  return (
    <CustomImageBackground
      style={styles.container}
      source={images.watermark_background_2}>
      <ScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        {/* -------------- TRANG THAI DON HANG  -------------- */}
        {renderStatusComponent()}
        {/* -------------- TRANG THAI DON HANG  -------------- */}

        <View style={styles.statusContainer}>
          {/* -------------- THONG TIN DON HANG  -------------- */}
          <OrderTitle title="THÔNG TIN GIAO HÀNG" />
          <OrderInfo info={shipping_address} />
          {/* -------------- THONG TIN DON HANG  -------------- */}

          {/* -------------- SAN PHAM DA CHON  -------------- */}

          <OrderTitle title="MÓN ĂN ĐÃ CHỌN" />
          <OrderProductList data={items} />
          {/* --------------  SAN PHAM DA CHON  -------------- */}

          {/* --------------  TOTAL PRICE  -------------- */}
          <OrderTotal total={total} />
          {/* --------------  TOTAL PRICE -------------- */}
          {order.status === 'pending' && (
            <View style={styles.btnRemmoveOrder}>
              <ButtonCC.ButtonBorderRed
                // onPress={onToggle}
                label={'HỦY ĐƠN HÀNG'}
                width={scaleWidth(195)}
                height={scaleHeight(61)}
              />
            </View>
          )}
          {order_complete && (
            <PopupRating
              visible={visible}
              onToggle={onClose}
              orderId={order.id}
            />
          )}
        </View>
      </ScrollView>
      {order_complete && renderBottomComponent()}
    </CustomImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainerStyle: {
    // paddingBottom: scaleHeight(20),
  },
  imageStatusOrder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scaleHeight(20),
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    backgroundColor: '#fff',
    flex: 0,
    justifyContent: 'space-around',
    paddingVertical: MARGIN_VERTICAL,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
    ...AppStyles.styles.shadow,
  },
  statusContent: {
    flex: 1,
    backgroundColor: AppStyles.colors.white,
    paddingBottom: 20,
  },
  image: {
    width: scaleWidth(267),
    height: scaleHeight(253),
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
  },

  headerPreOrder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },

  orderTitle: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    fontSize: 18,
    //fontWeight: 'bold',
    color: AppStyles.colors.accent,
  },
  headerSubTitle: {
    fontSize: 14,
    color: '#FFFFFF',
  },
  statusContainer: {
    flex: 1,
  },
  btnRemmoveOrder: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: scaleHeight(26),
  },
});
