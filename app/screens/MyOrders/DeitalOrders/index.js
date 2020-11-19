import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { AppStyles, images } from '@theme';
import { CustomButton, CustomImageBackground } from '@components';
import { PopupRating } from '../../components';
import { statusOrder, scale, format } from '@utils';
import { OrderInfo, OrderProductList, OrderTotal, OrderStatus } from './pages';
const { scaleHeight, scaleWidth } = scale;

const defaultData = [
  {
    options: '01 miếng gà giòn vui vẻ + 01 mỳ ý sốt bò bằm',
    extra: 'Súp bí đỏ (+25.000đ)',
    soft_drink: '7 Up nhỏ - 330ml (+5.000đ)',
    qty: 1,
    price: '85.000',
  },
  {
    options:
      '01 miếng gà giòn vui vẻ + 01 mỳ ý sốt bò bằm + 01 nước ngọt (vừa)',
    extra: 'Súp bí đỏ (+25.000đ)',
    soft_drink: '7 Up nhỏ - 330ml (+5.000đ)',
    qty: 2,
    price: '170.000',
  },
];

export default function Index({ navigation, route }) {
  const { order } = route.params;
  const [data, setData] = React.useState([]);
  const [visible, setVisible] = React.useState(false);

  let status = statusOrder.convertStatusOrder(order.status);
  let order_complete =
    status === 'hoàn thành' || status === 'đã hủy' ? true : false;
  let hours = format.hours(order.created_at);
  let date = format.date(order.created_at);

  const onClose = () => setVisible(false);
  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderTitle(),
    });

    setData(defaultData);
  }, [HeaderTitle, navigation]);

  React.useEffect(() => {
    setTimeout(() => {
      setVisible(true);
    }, 3000);
  }, []);

  const HeaderTitle = React.useCallback(
    () => (
      <View style={styles.headerTitleContainer}>
        <Text style={(AppStyles.fonts.medium_SVN, styles.headerTitle)}>
          Đơn hàng #{order.order_number}
        </Text>
        <Text style={(AppStyles.fonts.text, styles.headerSubTitle)}>
          {hours}, {date}
        </Text>
      </View>
    ),
    [date, hours, order.order_number],
  );

  const OrderTitle = ({ title, style }) => (
    <View style={[{ marginVertical: 20, marginLeft: 15 }, style]}>
      <Text style={styles.orderTitle}>{title}</Text>
    </View>
  );

  const ExpectedTime = () => (
    <View style={{ marginLeft: 15 }}>
      <Text style={(AppStyles.fonts.bold, { fontSize: 14 })}>
        Nhận hàng dự kiến:
        <Text style={(AppStyles.fonts.medium_SVN, { fontSize: 18 })}>
          10:30
        </Text>
      </Text>
    </View>
  );

  return (
    <CustomImageBackground
      style={styles.container}
      source={images.watermark_background_2}>
      <ScrollView
        //scrollEnabled={false}
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}>
        {/* -------------- TRANG THAI DON HANG  -------------- */}

        <View style={{ flex: 1, backgroundColor: AppStyles.colors.white }}>
          {!order_complete && (
            <View style={styles.imageStatusOrder}>
              <Image
                style={styles.image}
                source={statusOrder.getImage(status)}
              />
            </View>
          )}

          <ExpectedTime />

          {<OrderTitle title="TRẠNG THÁI ĐƠN HÀNG" />}
          <OrderStatus status={status} />
        </View>

        {/* -------------- TRANG THAI DON HANG  -------------- */}

        <View style={styles.statusContainer}>
          {/* -------------- THONG TIN DON HANG  -------------- */}
          <OrderTitle title="THÔNG TIN GIAO HÀNG" />
          <OrderInfo />
          {/* -------------- THONG TIN DON HANG  -------------- */}

          {/* -------------- SAN PHAM DA CHON  -------------- */}

          {/* <CustomButton
              // onPress={onToggle}
              label={'ĐẶT LẠI'}
              width={140}
              height={42}
              bgColor={AppStyles.colors.button}
              styleText={{ fontSize: 14 }}
            /> */}

          <OrderTitle title="MÓN ĂN ĐÃ CHỌN" />
          <OrderProductList data={data} />
          {/* --------------  SAN PHAM DA CHON  -------------- */}

          {/* --------------  TOTAL PRICE  -------------- */}
          <OrderTotal />
          {/* --------------  TOTAL PRICE -------------- */}

          {order_complete && (
            <PopupRating
              visible={visible}
              onToggle={onClose}
              orderId={order.id}
            />
          )}
        </View>
      </ScrollView>
    </CustomImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  imageStatusOrder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
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
});
