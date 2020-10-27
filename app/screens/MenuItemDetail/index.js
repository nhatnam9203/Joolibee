import { CustomAccordionList, CustomButton, CustomInput } from '@components';
import { SinglePageLayout } from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  ButtonCC,
  MenuDetailItem,
  MenuDetailItemSelectType,
  JollibeeImage,
} from '../components';
import { GCC } from '@graphql';
import { format } from '@utils';

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

const MenuItemDetailScreen = ({ route = { params: {} }, ...props }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { productItem } = route.params;

  const RenderMainSection = (itemProps) => {
    const { image, name, point, price_range } = itemProps;
    const { maximum_price, minimum_price } = price_range || {};

    return (
      <View style={styles.header}>
        <JollibeeImage
          style={styles.imageHeaderStyle}
          url={image?.url}
          defaultSource={images.menu_3}
        />

        <View style={styles.headerContent}>
          <Text
            style={AppStyles.styles.itemTitle}
            numberOfLines={0}
            ellipsizeMode="tail">
            {name}
          </Text>
          <View style={styles.priceContent}>
            {maximum_price && (
              <Text style={styles.txtFrontDiscountStyle}>
                {format.jollibeeCurrency(maximum_price?.final_price)}
              </Text>
            )}
            {minimum_price && (
              <Text style={styles.txtPriceStyle}>
                {format.jollibeeCurrency(minimum_price?.final_price)}
              </Text>
            )}
            {point > 0 && (
              <Text style={styles.txtPointStyle}>
                {`(+${point} ${translate('txtPoint')})`}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  };

  const renderOptionsItem = (item, index, type, onPress, selected) => (
    <MenuDetailItem
      onPress={onPress}
      item={item}
      selected={selected}
      key={item.id}
      type={type}
    />
  );

  const renderItem = (item, index) => {
    Logger.info(item, 'renderItem item');
    const {
      item: { title, options, type, option_id, required },
    } = item;
    return (
      <CustomAccordionList
        title={title}
        data={options.filter((x) => x.product)}
        type={type}
        key={option_id}
        required={required}
        headerTextStyle={styles.listHeaderTextStyle}
        headerStyle={styles.listHeaderStyle}
        style={styles.listStyle}
        renderItem={renderOptionsItem}
      />
    );
  };

  const renderFooter = () => (
    <View style={styles.orderContentStyle}>
      <View style={styles.orderAmountStyle}>
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
  );

  return (
    <>
      <SinglePageLayout backgroundColor="#fff">
        <View style={styles.container}>
          <GCC.QueryProductDetail
            productItem={productItem}
            renderMainSection={RenderMainSection}
            renderItem={renderItem}
            renderFooter={renderFooter}
          />
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

const MIN_HEIGHT = 289;
const TOTAL_HEIGHT = 125;
const ORDER_AMOUNT_HEIGHT = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.background,
  },

  listStyle: { backgroundColor: AppStyles.colors.background },

  header: {
    flex: 0,
    backgroundColor: '#fff',
    paddingBottom: 20,
    marginBottom: 10,
    ...AppStyles.styles.shadow,
  },

  headerContent: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  imageHeaderStyle: {
    marginBottom: 10,
    minHeight: MIN_HEIGHT,
    width: '100%',
  },

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
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: TOTAL_HEIGHT + ORDER_AMOUNT_HEIGHT,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },

  orderAmountStyle: {
    flex: 0,
    flexDirection: 'row',
    height: ORDER_AMOUNT_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonOrderStyle: {
    width: 47,
    height: 47,
    backgroundColor: AppStyles.colors.accent,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  mulInputStyle: {
    height: 47,
    width: 80,
    borderColor: '#707070',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    height: TOTAL_HEIGHT,
    ...AppStyles.styles.shadow,
  },

  orderSumContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  txtStyle: { ...AppStyles.fonts.text },
});

export default MenuItemDetailScreen;
