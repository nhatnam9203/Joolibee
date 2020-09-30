import { CustomButton, CustomAccordionList } from '@components';
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
} from 'react-native';
import {
  SettingItem,
  MenuDetailItem,
  MenuDetailItemSelectType,
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
        <SafeAreaView style={styles.container}>
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
              />
            ))}
          </View>
        </SafeAreaView>
      </SinglePageLayout>

      {/**Close Button */}
      <CustomButton onPress={() => navigation.goBack()} absolute={true}>
        <Image source={images.icons.popup_close} />
      </CustomButton>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },

  header: { backgroundColor: '#FFF', marginTop: 10 },
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
});
export default MenuItemDetailScreen;
