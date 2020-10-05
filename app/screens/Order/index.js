/* eslint-disable react-native/no-inline-styles */
import {
  CustomFlatList,
  CustomTextLink,
  CustomInput,
  CustomButtonImage,
} from '@components';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { images, AppStyles } from '@theme';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {
  ButtonCC,
  LabelTitle,
  PopupNoticeEnvironment,
  PopupOrderSuccess,
} from '../components';
import ScreenName from '../ScreenName';
import { SinglePageLayout } from '@layouts';
import { OrderItem } from './widget';
import { OrderItems } from './LocalData';
import { CustomSwitch } from '@components';

const OrderSection = ({ title, children, buttonComponent }) => {
  return (
    <View>
      <View style={AppStyles.styles.horizontalLayout}>
        {!!title && (
          <LabelTitle
            label={title}
            color={AppStyles.colors.accent}
            fontSize={18}
          />
        )}
        {buttonComponent && buttonComponent()}
      </View>
      <View>{children}</View>
    </View>
  );
};

const OrderSectionItem = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.itemStyle} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const ShippingType = {
  InShop: 1,
  InPlace: 2,
};

const CONFIRM_HEIGHT = 150;

const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [shippingType, setShippingType] = React.useState(ShippingType.InShop);
  const [showNotice, setShowNotice] = React.useState(false);
  const [showPopupSuccess, setShowPopupSuccess] = React.useState(false);

  const onTogglePopupNotice = () => {
    setShowNotice(false);
  };
  const onTogglePopupSuccess = () => {
    setShowPopupSuccess(false);
  };

  React.useEffect(() => {
    setTimeout(() => {
      setShowNotice(true);
    }, 1500);
  }, []);

  return (
    <>
      <SinglePageLayout backgroundColor={AppStyles.colors.background}>
        <SafeAreaView style={styles.content}>
          {/**Shipping Type */}
          <OrderSection>
            <OrderSectionItem
              onPress={() => {
                setShippingType(ShippingType.InPlace);
              }}>
              <View style={AppStyles.styles.horizontalLayout}>
                <Image
                  source={images.icons.ic_delivery}
                  style={styles.imgShippingStyle}
                  resizeMode="center"
                />
                <Text style={styles.txtTitleStyle}>
                  {translate('txtShippingOrder')}
                </Text>
              </View>
              <Image
                style={styles.arrowStyle}
                source={
                  shippingType === ShippingType.InPlace
                    ? images.icons.ic_radio_active
                    : images.icons.ic_radio_inactive
                }
              />
            </OrderSectionItem>
            <OrderSectionItem
              onPress={() => {
                setShippingType(ShippingType.InShop);
              }}>
              <View style={AppStyles.styles.horizontalLayout}>
                <Image
                  source={images.icons.ic_in_store}
                  style={styles.imgShippingStyle}
                  resizeMode="center"
                />
                <Text style={styles.txtTitleStyle}>
                  {translate('txtPlaceInShopOrder')}
                </Text>
              </View>
              <Image
                style={styles.arrowStyle}
                source={
                  shippingType === ShippingType.InShop
                    ? images.icons.ic_radio_active
                    : images.icons.ic_radio_inactive
                }
              />
            </OrderSectionItem>
          </OrderSection>

          {/**Shipping Info */}
          <OrderSection title={`${translate('txtShippingInfo')}`.toUpperCase()}>
            <OrderSectionItem>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.txtStyle}>hhahah</Text>
              </View>
              <View
                style={{
                  width: 1,
                  height: '60%',
                  backgroundColor: '#DBDBDB',
                }}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.txtStyle}>dfdf</Text>
              </View>
            </OrderSectionItem>
            <OrderSectionItem>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  paddingHorizontal: 10,
                }}>
                <Text style={[styles.txtTitleStyle, { flex: 0 }]}>
                  {shippingType === ShippingType.InPlace
                    ? translate('txtShippingTo')
                    : translate('txtToReceive')}
                  :
                </Text>
                <Text
                  style={[styles.txtStyle, { flex: 1 }]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  16 Trương Định, P. 6, Q. 3, Tp. Hồ Chí Minh
                </Text>
              </View>

              <CustomButtonImage
                image={images.icons.ic_order_edit}
                style={styles.editOrderStyle}
              />
            </OrderSectionItem>
            <OrderSectionItem>
              <TextInput
                placeholder={translate('txtNote')}
                multiline={true}
                style={styles.txtNoteStyle}
              />
            </OrderSectionItem>
          </OrderSection>

          <OrderSection
            title={translate('txtItemSelect')}
            buttonComponent={() => (
              <ButtonCC.ButtonYellow
                label={translate('txtOrderMore')}
                style={styles.buttonHeaderStyle}
                textStyle={styles.headerButtonTextStyle}
              />
            )}>
            {OrderItems.map((item) => (
              <OrderSectionItem>
                <OrderItem item={item} />
              </OrderSectionItem>
            ))}

            <OrderSectionItem>
              <View style={styles.orderSumContent}>
                <Text style={styles.txtTitleStyle}>
                  {translate('txtOrderCalculator')} :
                </Text>
                <Text style={styles.txtStyle}>25.000 đ</Text>
              </View>
            </OrderSectionItem>
            <OrderSectionItem>
              <View style={styles.orderSumContent}>
                <View style={styles.container}>
                  <Text style={styles.txtTitleStyle}>
                    {translate('txtNotice')}
                  </Text>
                  <Text style={styles.txtStyle}>
                    {translate('txtNoticeEnvironment')}
                  </Text>
                </View>
                <CustomSwitch />
              </View>
            </OrderSectionItem>
          </OrderSection>
          <OrderSection title={translate('txtPaymentMethod')}>
            <OrderSectionItem>
              <View style={AppStyles.styles.horizontalLayout}>
                <Image source={images.icons.ic_money} />
                <Text style={styles.txtStyle}>
                  {translate('txtPaymentMoney')}
                </Text>
              </View>
            </OrderSectionItem>
          </OrderSection>
          <OrderSection title={translate('txtPromotionApply')}>
            <OrderSectionItem>
              <View style={AppStyles.styles.horizontalLayout}>
                <Image source={images.icons.ic_sticked} />
                <Text style={styles.txtStyle}>Ưu đãi 40.000 đ</Text>
              </View>
              <CustomButtonImage
                image={images.icons.ic_order_edit}
                style={styles.editOrderStyle}
              />
            </OrderSectionItem>
          </OrderSection>
        </SafeAreaView>
      </SinglePageLayout>

      <View style={styles.confirmStyle}>
        <View style={styles.orderSumContent}>
          <Text style={styles.txtStyle}>Tổng cộng : </Text>
          <Text style={styles.txtPriceStyle}>0.00 đ</Text>
        </View>
        <ButtonCC.ButtonRed
          label={translate('txtConfirm')}
          onPress={() => {
            setShowPopupSuccess(true);
          }}
        />
      </View>

      {/**Popup Notice */}
      <PopupNoticeEnvironment
        visible={showNotice}
        onToggle={onTogglePopupNotice}
      />

      {/**Popup Order Success */}
      <PopupOrderSuccess
        visible={showPopupSuccess}
        onToggle={onTogglePopupSuccess}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 20,
    marginBottom: CONFIRM_HEIGHT * 2,
  },

  confirmStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: AppStyles.colors.accent,
    height: CONFIRM_HEIGHT,
  },

  orderSumContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },

  txtTitleStyle: { ...AppStyles.fonts.medium, fontSize: 16, margin: 5 },
  txtStyle: { ...AppStyles.fonts.text, fontSize: 16, margin: 5 },

  txtPriceStyle: {
    ...AppStyles.fonts.title,
    fontSize: 21,
    color: AppStyles.colors.accent,
  },

  itemStyle: {
    ...AppStyles.styles.shadow,
    backgroundColor: '#fff',
    minHeight: 50,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  imgShippingStyle: {
    height: 42,
    width: 42,
    marginRight: 10,
  },

  editOrderStyle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: AppStyles.colors.button,
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtNoteStyle: {},

  buttonHeaderStyle: { width: '40%', height: '60%' },

  headerButtonTextStyle: {
    fontSize: 14,
    color: '#1B1B1B',
  },
});

export default OrderScreen;
