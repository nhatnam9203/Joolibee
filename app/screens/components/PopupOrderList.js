import { CustomFlatList } from '@components';
import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ButtonCC, OrderItem } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ScreenName from '../ScreenName';
import { cart } from '@slices';

const defaultData = [
  {
    id: 1,
    image: images.jollibee_combo,
    title: 'CƠM GÀ GIÒN + SÚP BÍ ĐỎ + NƯỚC NGỌT',
    description: 'Pepsi (Lớn) +20.000đ  Khoai tây lắc vị BBQ (Lớn) +10.000đ',
    price: '60.000 đ',
    point: 5,
  },
  {
    id: 2,
    image: images.jollibee_combo,
    title: 'CƠM GÀ GIÒN + SÚP BÍ ĐỎ + NƯỚC NGỌT',
    description: 'Pepsi (Lớn) +20.000đ  Khoai tây lắc vị BBQ (Lớn) +10.000đ',
    price: '30.000 đ',
    point: 5,
  },
  {
    id: 3,
    image: images.jollibee_combo,
    title: 'CƠM GÀ GIÒN + SÚP BÍ ĐỎ + NƯỚC NGỌT',
    description: 'Pepsi (Lớn) +20.000đ  Khoai tây lắc vị BBQ (Lớn) +10.000đ',
    price: '90.000 đ',
    point: 5,
  },
  {
    id: 4,
    image: images.jollibee_combo,
    title: 'CƠM GÀ GIÒN + SÚP BÍ ĐỎ + NƯỚC NGỌT',
    description: 'Pepsi (Lớn) +20.000đ  Khoai tây lắc vị BBQ (Lớn) +10.000đ',
    price: '90.000 đ',
    point: 5,
  },
];

export const PopupOrderList = ({ visible, onToggle }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const popupRef = React.createRef(null);

  // const cart_id = useSelector((state) => state.cart?.cart_id);
  // const {
  //   items = [],
  //   prices: { grand_total },
  // } = useSelector((state) => state.cart?.cart_detail);

  const renderItem = ({ item, index }) => (
    <OrderItem item={item} key={item.id + ''} shadow={false} />
  );

  const orderPressed = () => {
    popupRef.current.forceQuit();
  };

  const paymentPressed = () => {
    navigation.navigate(ScreenName.Order);
    popupRef.current.forceQuit();
  };

  // React.useEffect(() => {
  //   dispatch(cart.cartDetail(cart_id));
  // }, []);

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
          <CustomFlatList
            data={defaultData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id + ''}
            ItemSeparatorComponent={() => (
              <View style={AppStyles.styles.rowSeparator} />
            )}
            contentContainerStyle={styles.contentContainerStyle}
          />
        </View>
        <View style={styles.bottomContent}>
          <View style={AppStyles.styles.horizontalLayout}>
            <Text style={styles.labelSum}>{translate('txtSummary')} :</Text>
            <View style={styles.priceContent}>
              <Text style={styles.priceStyle}>{'0'}đ</Text>
              <Text style={styles.pointStyle}>(+ 0 điểm)</Text>
            </View>
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
