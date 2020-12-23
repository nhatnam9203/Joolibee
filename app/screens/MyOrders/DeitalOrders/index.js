import React from 'react';
import moment from 'moment';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { AppStyles, images } from '@theme';
import { CustomImageBackground, Loading } from '@components';
import { PopupRating, ButtonCC } from '../../components';
import ScreenName from '../../ScreenName';
import { translate } from '@localize';
import { app } from '@slices';
import { useDispatch } from 'react-redux';
import { statusOrder, scale, format } from '@utils';
import { GEX, GQL } from '@graphql';
import { OrderInfo, OrderProductList, OrderTotal, OrderStatus } from './pages';
import NavigationService from '../../../navigation/NavigationService';
import { useLazyQuery, useQuery } from '@apollo/client';
import { stat } from 'react-native-fs';

const { scaleHeight, scaleWidth } = scale;
const MARGIN_LEFT = scaleWidth(15);
const MARGIN_VERTICAL = scaleHeight(20);

export default function Index({ navigation, route }) {
  const dispatch = useDispatch();
  const { order } = route.params || {};
  const [visible, setVisible] = React.useState(false);
  const [{ orderList }, getOrderList] = GEX.useOrderList();

  let {
    order_number,
    created_at,
    status,
    address,
    grand_total,
    id,
    shipper_info,
    voucher_discount_amount,
  } = order || {};

  const findOrder = orderList?.find((x) => x?.id === id);
  status = findOrder?.status;
  const [getOrderDetail, orderDetailResp] = useLazyQuery(
    GQL.ORDER_DETAIL_CUSTOMER,
    {
      fetchPolicy: 'network-only',
    },
  );

  let status_order = statusOrder.convertStatusOrder(status);
  let order_complete =
    status_order === translate('txtStatusOrderComplete') ? true : false;
  const getDate = React.useCallback(() => {
    const current_day = moment().format('DD/MM/yyyy');
    let dateOrder = format.dateTime(created_at);
    return dateOrder === current_day ? translate('txtToday') : dateOrder;
  }, [created_at]);
  let hours = format.hours(created_at);

  const onClose = () => setVisible(false);

  // --------------- Re Order Items Cart ----------------- //
  const onReOderSuccess = () => {
    navigation.navigate(ScreenName.NewHome);
    setTimeout(() => {
      dispatch(app.showOrderList());
    }, 1000);
  };
  const { reorderItems } = GEX.useReOrderCart(onReOderSuccess);

  const onHandleReOrder = () => {
    dispatch(app.showLoading());
    reorderItems(order_number);
  };
  // --------------- Re Order Items Cart End ----------------- //

  // --------------- Re Order Items Cart ----------------- //
  const { cancelOrder } = GEX.useCancelOrder(() =>
    navigation.navigate(ScreenName.NewHome),
  );

  const onHandleCancel = () => {
    //NavigationService.showComingSoon();
    dispatch(app.showLoading());
    cancelOrder(id);
  };
  // --------------- Re Order Items Cart End ----------------- //

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderTitle(),
    });
  }, [HeaderTitle, navigation]);

  const HeaderTitle = React.useCallback(
    () => (
      <View style={styles.headerTitleContainer}>
        <Text style={(AppStyles.fonts.medium_SVN, styles.headerTitle)}>
          {translate('txtOrderNumber')} #{order_number}
        </Text>
        <Text style={(AppStyles.fonts.text, styles.headerSubTitle)}>
          {hours}, {getDate()}
        </Text>
      </View>
    ),
    [getDate, hours, order_number],
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerTitle: HeaderTitle(),
    });
  }, [HeaderTitle, navigation]);

  React.useEffect(() => {
    if (order_number) {
      getOrderDetail({ variables: { number: order_number } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order_number]);

  const OrderTitle = ({ title, style }) => (
    <View
      style={[
        { marginLeft: MARGIN_LEFT, marginVertical: MARGIN_VERTICAL },
        style,
      ]}>
      <Text style={styles.orderTitle}>{title?.toUpperCase()}</Text>
    </View>
  );

  const ExpectedTime = () => (
    <View style={{ marginLeft: MARGIN_LEFT }}>
      <Text style={[AppStyles.fonts.medium, { fontSize: 14 }]}>
        {translate('txtExpectedReceive')}
        <Text style={[AppStyles.fonts.SVN_Merge_Bold, { fontSize: 18 }]}>
          {format.hours(created_at, 30)}
        </Text>
      </Text>
    </View>
  );

  const renderStatusComponent = () => {
    if (
      order_complete ||
      status === 'pending' ||
      status?.toLowerCase() === 'processing'
    ) {
      return (
        <>
          <OrderTitle title={translate('txtOrderStattus')} />
          <View style={styles.statusContent}>
            <OrderStatus status={status_order} />
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
          title={translate('txtOrderStattus')}
          style={{ marginVertical: scaleHeight(5) }}
        />
        <OrderStatus status={status_order} shipper={shipper_info} />
      </View>
    );
  };

  const renderBottomComponent = () => {
    return (
      <View style={styles.bottomContainer}>
        <ButtonCC.ButtonYellow
          onPress={() => setVisible(true)}
          label={translate('txtFeeback')}
          width={scaleWidth(185)}
          height={scaleHeight(61)}
        />
        <ButtonCC.ButtonRed
          onPress={onHandleReOrder}
          label={translate('txtReOrder')}
          width={scaleWidth(185)}
          height={scaleHeight(61)}
        />
      </View>
    );
  };

  const { items, total, shipping_address } =
    orderDetailResp?.data?.customer?.orders?.items?.find(Boolean) || {};

  return (
    <>
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
            <OrderTitle title={translate('txtInfoShipping')} />
            {shipping_address && <OrderInfo info={shipping_address} />}
            {/* -------------- THONG TIN DON HANG  -------------- */}

            {/* -------------- SAN PHAM DA CHON  -------------- */}

            <OrderTitle title={translate('txtItemSelect')} />
            {items && <OrderProductList data={items} />}
            {/* --------------  SAN PHAM DA CHON  -------------- */}

            {/* --------------  TOTAL PRICE  -------------- */}
            <OrderTotal
              total={total}
              voucher_discount_amount={voucher_discount_amount}
            />

            {/* --------------  TOTAL PRICE (FEEDBACK) -------------- */}
            {(status?.toLowerCase() === 'pending' ||
              status?.toLowerCase() === 'processing') && (
              <View style={styles.btnRemoveOrder}>
                <ButtonCC.ButtonBorderRed
                  onPress={onHandleCancel}
                  label={translate('txtCancel')}
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
      <Loading isLoading={orderDetailResp.loading} />
    </>
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
  btnRemoveOrder: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: scaleHeight(26),
  },
});
