import { CustomAccordionList, CustomButton, CustomInput } from '@components';
import { GCC } from '@graphql';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import { destructuring, format } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import {
  ButtonCC,
  JollibeeImage,
  MenuDetailItem,
  MenuOptionSelectedItem,
} from '../components';
import { productReducer, setProduct, updateOption } from './ProductState';
import { useMutation } from '@apollo/client';
import { mutation } from '@graphql';
import { useSelector, useDispatch } from 'react-redux';
import { app } from '@slices';

const MenuItemDetailScreen = ({ route = { params: {} } }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { productItem } = route.params;

  const [quantity, setQuantity] = React.useState(1);
  const [productItemDetail, dispatchChangeProduct] = React.useReducer(
    productReducer,
    null,
  );

  const [addSimpleProductsToCart] = useMutation(mutation.ADD_PRODUCT_TO_CART, {
    update(cache, { data: { addSimpleProductsToCart } }) {
      cache.modify({
        id: cache.identify(addSimpleProductsToCart),
        fields: {
          cart(existingCart = []) {
            // Logger.debug(addSimpleProductsToCart, 'addSimpleProductsToCart');

            // Logger.debug(existingCart, 'existingCart');

            return existingCart;
          },
        },
      });
    },
  });
  const cart_id = useSelector((state) => state.cart?.cart_id);

  const renderOptionsItem = ({ item, index, type, onPress }) => (
    <MenuDetailItem
      item={item}
      key={`${index}`}
      type={type}
      onPress={onPress}
    />
  );

  const onRenderSelectedItem = (item) => (
    <MenuOptionSelectedItem item={item?.first} list={item} />
  );

  const renderHeader = () => {
    if (!productItemDetail) {
      return <></>;
    }

    const { image, name, point, price_range } = productItemDetail;
    const { sellPrice, showPrice } = destructuring.priceOfRange(price_range);

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
            {showPrice && (
              <Text style={styles.txtFrontDiscountStyle}>
                {format.jollibeeCurrency(showPrice)}
              </Text>
            )}
            {sellPrice && (
              <Text style={styles.txtPriceStyle}>
                {format.jollibeeCurrency(sellPrice)}
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

  const onChangeOptionsItem = (item) => {
    dispatchChangeProduct(updateOption(item));
  };

  const renderItem = ({ item }) => {
    return (
      <CustomAccordionList
        item={item}
        headerTextStyle={styles.listHeaderTextStyle}
        headerStyle={styles.listHeaderStyle}
        style={styles.listStyle}
        renderItem={renderOptionsItem}
        renderSelectItem={onRenderSelectedItem}
        onChangeOptionsItem={onChangeOptionsItem}
      />
    );
  };

  const renderFooter = () => {
    return (
      <View style={styles.orderContentStyle}>
        <View style={styles.orderAmountStyle}>
          <CustomButton
            style={styles.buttonOrderStyle}
            onPress={() => setQuantity((prev) => prev - 1)}
            disabled={quantity <= 1}
            borderRadius={6}>
            <Image source={images.icons.ic_sub} />
          </CustomButton>
          <CustomInput
            style={styles.mulInputStyle}
            inputStyle={styles.inputStyle}
            keyboardType="numeric"
            allowFontScaling={true}
            numberOfLines={1}
            editable={false}
            value={quantity?.toString()}
            multiline={false}
            clearTextOnFocus={true}
            maxLength={3}
          />
          <CustomButton
            style={styles.buttonOrderStyle}
            onPress={() => setQuantity((prev) => prev + 1)}
            disabled={quantity > 255}
            borderRadius={6}>
            <Image source={images.icons.ic_plus} />
          </CustomButton>
        </View>
      </View>
    );
  };

  const onReceivedProduct = (item) => {
    dispatchChangeProduct(setProduct(item));
  };

  const renderSummaryPrice = () => {
    let priceString = '0.0 đ';
    if (productItemDetail) {
      const { price_range, items } = productItemDetail;
      const { sellPrice } = destructuring.priceOfRange(price_range);

      let { value } = sellPrice;

      items.forEach((item) => {
        const { options } = item;
        const sumOptionPrice = options
          .filter((x) => x.is_default === true && x.price)
          .reduce((accumulator, current) => accumulator + current.price, 0);

        value += sumOptionPrice;
      });

      value *= quantity;

      priceString = format.jollibeeCurrency(
        Object.assign({}, sellPrice, { value }),
      );
    }

    return (
      <View style={styles.orderSumContent}>
        <Text style={styles.txtStyle}>{`${translate('txtSummary')} : `}</Text>
        <Text style={styles.txtPriceStyle}>{priceString}</Text>
      </View>
    );
  };

  const addProductToCart = () => {
    const { sku } = productItemDetail;
    addSimpleProductsToCart({
      variables: {
        cart_id,
        cart_items: [
          {
            data: {
              quantity: quantity,
              sku: sku,
            },
          },
        ],
      },
    });

    navigation.goBack();
    dispatch(app.showOrderList());
  };

  return (
    <>
      <View style={styles.container}>
        <GCC.QueryProductDetail
          productItem={productItem}
          renderHeader={renderHeader}
          renderItem={renderItem}
          renderFooter={renderFooter}
          updateProductItemDetail={onReceivedProduct}
          optionData={productItemDetail?.items}
        />
      </View>

      {/**Close Button */}
      <CustomButton
        onPress={() => navigation.goBack()}
        absolute={true}
        style={styles.closeButtonStyle}>
        <Image source={images.icons.popup_close} />
      </CustomButton>

      <View style={styles.confirmStyle}>
        {renderSummaryPrice()}
        <ButtonCC.ButtonRed
          label={translate('txtAddCart')}
          onPress={addProductToCart}
        />
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
    backgroundColor: '#fff',
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
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    ...AppStyles.styles.shadow,
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
    fontSize: 15,
    ...AppStyles.fonts.bold,
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
