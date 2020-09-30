import { CustomButton, CustomAccordionList, CustomInput } from '@components';
import { translate } from '@localize';
import { AppStyles, images, metrics } from '@theme';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  SettingItem,
  MenuDetailItem,
  MenuDetailItemSelectType,
  ButtonCC,
} from '../components';
import { useDispatch } from 'react-redux';
import { logout } from '@slices/account';
import ScreenName from '../ScreenName';
import { useNavigation } from '@react-navigation/native';
import { SinglePageLayout } from '@layouts';

const defaultData = [
  {
    title: 'ĐỔI NƯỚC',
    type: 1,
    data: [
      {
        title: 'Pepsi',
        image: images.menu_detail_item_pepsi,
        price: '+5.000 đ',
        id: 1,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 2,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 3,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 4,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 5,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 6,
      },
    ],
  },
  {
    title: 'ĐỔI KHOAI',
    type: 1,
    data: [
      {
        title: 'Pepsi',
        image: images.menu_detail_item_pepsi,
        price: '+5.000 đ',
        id: 1,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 2,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 3,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 4,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 5,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 6,
      },
    ],
  },
  {
    title: 'MUA THÊM (add-on các món khác)',
    type: -1,
    data: [
      {
        title: 'Pepsi',
        image: images.menu_detail_item_pepsi,
        price: '+5.000 đ',
        id: 1,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 2,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 3,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 4,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 5,
      },
      {
        title: 'Nước suối đóng chai',
        image: images.menu_detail_item_nuocsuoi,
        price: '+5.000 đ',
        id: 6,
      },
    ],
  },
];

const MenuItemDetailScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const renderItem = (item, index, type, onPress, selected) => {
    return (
      <MenuDetailItem
        onPress={onPress}
        item={item}
        selected={selected}
        type={
          type !== -1
            ? MenuDetailItemSelectType.Radio
            : MenuDetailItemSelectType.Multiline
        }
      />
    );
  };

  return (
    <>
      <SinglePageLayout>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image
              style={styles.imageHeaderStyle}
              source={images.item_detail_thumb}
              resizeMode="center"
            />
            <View style={styles.headerContent}>
              <Text
                style={AppStyles.styles.itemTitle}
                numberOfLines={5}
                ellipsizeMode="tail">
                03 MIẾNG GÀ GIÒN VUI VẺ + 01 MỲ Ý SỐT BÒ BẰM + 01 KHOAI TÂY
                (VỪA) + 02 NƯỚC NGỌT (VỪA)
              </Text>
              <View style={styles.priceContent}>
                <Text style={styles.txtFrontDiscountStyle}>160000</Text>
                <Text style={styles.txtPriceStyle}>139000 đ</Text>
                <Text style={styles.txtPointStyle}>(+ 13 điểm)</Text>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            {defaultData.map(({ title, data, type }, index) => (
              <CustomAccordionList
                title={title}
                data={data}
                type={type}
                key={`${index}`}
                headerTextStyle={styles.listHeaderTextStyle}
                headerStyle={styles.listHeaderStyle}
                renderItem={renderItem}
                isRadio={index !== 2}
                style={styles.listStyle}
              />
            ))}

            <View style={styles.orderContentStyle}>
              <TouchableOpacity style={styles.buttonOrderStyle}>
                <Image source={images.icons.ic_sub} />
              </TouchableOpacity>
              <CustomInput
                style={styles.mulInputStyle}
                inputStyle={styles.inputStyle}
                keyboardType="numeric"
                allowFontScaling={true}
                numberOfLines={1}
                defaultValue="0"
                multiline={false}
                clearTextOnFocus={true}
                maxLength={3}
              />
              <TouchableOpacity style={styles.buttonOrderStyle}>
                <Image source={images.icons.ic_plus} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SinglePageLayout>

      {/**Close Button */}
      <CustomButton
        onPress={() => navigation.goBack()}
        absolute={true}
        style={styles.closeButtonStyle}>
        <Image source={images.icons.popup_close} />
      </CustomButton>

      <View style={styles.confirmStyle}>
        <View style={styles.orderSumContent}>
          <Text style={styles.txtStyle}>Tổng cộng : </Text>
          <Text style={styles.txtPriceStyle}>0.00 đ</Text>
        </View>
        <ButtonCC.ButtonRed label={translate('txtConfirm')} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,
    paddingBottom: 80,
  },

  listStyle: { backgroundColor: AppStyles.colors.background },

  header: { backgroundColor: '#FFF', marginTop: 0, paddingTop: 20 },
  headerContent: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imageHeaderStyle: { width: '100%' },

  priceContent: {
    marginLeft: 15,
    alignItems: 'flex-end',
  },

  txtPriceStyle: {
    ...AppStyles.fonts.title,
    fontSize: 21,
    color: AppStyles.colors.accent,
  },

  txtFrontDiscountStyle: {
    ...AppStyles.fonts.header,
    color: '#707070',
    fontSize: 18,
    textDecorationLine: 'line-through',
  },

  txtPointStyle: {
    ...AppStyles.fonts.medium,
    color: '#707070',
    fontSize: 14,
  },

  listHeaderTextStyle: {
    ...AppStyles.fonts.header,
    fontSize: 18,
  },

  listHeaderStyle: {
    backgroundColor: '#FFC522',
    height: 46,
  },

  closeButtonStyle: {
    top: 30,
  },

  orderContentStyle: {
    flexDirection: 'row',
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginTop: 15,
  },

  buttonOrderStyle: {
    width: 30,
    height: 30,
    backgroundColor: AppStyles.colors.accent,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mulInputStyle: {
    height: 35,
    width: 60,
    borderColor: '#707070',
    justifyContent: 'center',
    paddingHorizontal: 2,
    paddingVertical: 2,
  },

  inputStyle: {
    paddingLeft: 0,
    margin: 0,
    fontSize: 16,
    height: '100%',
    textAlign: 'center',
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
  },

  orderSumContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  txtStyle: { ...AppStyles.fonts.text },
});
export default MenuItemDetailScreen;
