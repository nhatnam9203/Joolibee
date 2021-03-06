import { CustomAccordionList, CustomButton, CustomInput } from '@components';
import { GCC, GEX, GQL } from '@graphql';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import { destructuring, format, scale } from '@utils';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useLazyQuery } from '@apollo/client';

import {
  ButtonCC,
  JollibeeImage,
  MenuDetailItem,
  MenuOptionSelectedItem,
} from '../components';
import {
  productReducer,
  setProduct,
  updateProduct,
  updateOption,
  increaseQuantity,
  decreaseQuantity,
} from './ProductState';
import {
  ProductItemDetailHeader,
  ProductDetailFlatList,
  ProductItemDetailFooter,
} from './widget';

const { scaleHeight, scaleWidth } = scale;
const { width, height } = Dimensions.get('window');
const ANIMATION_DURATION = 800;
const CART_ICON_X = scaleWidth(25);
const CART_ICON_Y = scaleHeight(65);
const DEFAULT_CURRENCY_VALUE = '0.0 đ';

const MenuItemDetailScreen = ({ route = { params: {} } }) => {
  const { product, detailItem, sku } = route.params || {};

  const navigation = useNavigation();
  // animations
  const viewScale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const aref = useAnimatedRef();

  const [qty, setQyt] = React.useState(detailItem?.quantity ?? 1);
  //
  const [productItem, dispatchChangeProduct] = React.useReducer(
    productReducer,
    product,
  );

  const { addProductsToCart } = GEX.useAddProductsToCart();
  const [, updateCart] = GEX.useUpdateCustomerCart();

  const [getProductDetail, { loading }] = useLazyQuery(GQL.PRODUCT_DETAIL, {
    variables: { sku: product?.sku || sku },
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      if (data) {
        const item = data.products?.items[0];
        Logger.debug(detailItem, '=========> getProductDetail XXX');
        if (detailItem?.bundle_options?.length > 0) {
          const { items } = item || {};
          const list = items.map((x) => {
            const { option_id, options } = x;

            const needUpdateOption = detailItem?.bundle_options.find(
              (option) => option.id === option_id,
            );

            if (needUpdateOption) {
              const { values } = needUpdateOption;
              const renewOptions = options.map((opt) => {
                const needUpdateOptItem = values.find(
                  (optItem) => optItem.id === opt.id,
                );

                if (needUpdateOptItem) {
                  return Object.assign({}, opt, {
                    is_default: true,
                    quantity: needUpdateOptItem.quantity,
                  });
                } else {
                  return Object.assign({}, opt, { is_default: false });
                }
              });

              return Object.assign({}, x, { options: renewOptions });
            } else {
              return x;
            }
          });

          dispatchChangeProduct(
            updateProduct(Object.assign({}, item, { items: list })),
          );
        } else {
          dispatchChangeProduct(updateProduct(item));
        }
      }
    },
  });

  const onChangeOptionsItem = (item) => {
    dispatchChangeProduct(updateOption(item));
  };

  const renderSummaryPrice = () => {
    let priceString = DEFAULT_CURRENCY_VALUE;
    if (productItem) {
      const { price_range, items } = productItem || {};
      const { sellPrice } = destructuring.priceOfRange(price_range);

      let { value = 0 } = sellPrice || {};

      items?.forEach((item) => {
        const { options } = item || {};
        const sumOptionPrice = options
          .filter((x) => x.is_default === true && x.price)
          .reduce(
            (accumulator, current) =>
              accumulator + current.price * current.quantity,
            0,
          );

        value += sumOptionPrice;
      });

      value *= qty;

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

  const customSpringStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: offsetX.value },
        {
          translateY:
            -(height - height * viewScale.value) / 2 +
            (1 - viewScale.value) * CART_ICON_Y,
        },
        { scale: viewScale.value },
      ],
    };
  });

  const addProductToCart = () => {
    const { sku, items = [] } = productItem;
    requestAddCartProduct(productItem);

    animationOnQuit();
    // dispatch(app.showOrderList());
  };

  const removeCartProduct = async (cartItemId) => {
    const input = {
      cart_item_id: cartItemId,
      quantity: 0,
    };

    await updateCart({
      variables: input,
    });
  };

  const updateCartProduct = async () => {
    // Remove cart
    await removeCartProduct(detailItem.id);

    // Then add new product
    await requestAddCartProduct(productItem);

    // animationOnQuit();
    navigation.goBack();
    // addProductToCart();
  };

  const requestAddCartProduct = (cartItem) => {
    Logger.debug(cartItem, '======> cartItem');
    const { sku, items = [] } = cartItem || {};
    const optionsMap = [];
    // Logger.debug(productItem, '======> xxxxxxxx productItem');
    /**
     * them sl cho option
     */
    // items?.forEach((item) => {
    //   const { options = [], option_id } = item;
    //   const activeOptionList = options.filter((x) => x.is_default === true);

    // const mapArr = activeOptionList?.map((x) => ({
    //   id: parseInt(option_id),
    //   quantity: x?.quantity ?? 1,
    //   value: [x.id + ''],
    // }));

    //   optionsMap.push(...mapArr);
    // });

    items.forEach((item) => {
      const { options = [], option_id } = item || {};
      const valuesArr = options
        .filter((x) => x.is_default === true)
        .map((x) => x.id + '');

      const quantityArr = options
        .filter((x) => x.is_default === true)
        .map((x) => {
          return {
            option_value: x.id,
            selection_id: x.product?.id,
            qty: x.quantity,
          };
        });

      const selectOptions = {
        id: parseInt(option_id),
        quantity: quantityArr,
        value: valuesArr,
      };

      optionsMap.push(selectOptions);
    });

    addProductsToCart({
      variables: {
        cart_items: [
          {
            data: { quantity: qty, sku: sku },
            bundle_options: optionsMap,
          },
        ],
      },
    });
  };

  const animationOnQuit = () => {
    viewScale.value = withTiming(0, {
      duration: ANIMATION_DURATION,
      easing: Easing.bezier(0.45, 0.45, 0.2, 0.75),
    });

    offsetX.value = withDelay(
      ANIMATION_DURATION / 2,
      withTiming((width * viewScale.value) / 2 - CART_ICON_X, {
        duration: ANIMATION_DURATION / 2,
        easing: Easing.in,
      }),
    );

    setTimeout(() => {
      navigation.goBack();
    }, ANIMATION_DURATION);
  };
  /**
   * ================================================================
   *
   * EDIT
   *
   * ================================================================
   */
  const onRenderSelectedItem = (item) => (
    <MenuOptionSelectedItem item={item?.first} list={item} />
  );

  const renderOptionsItem = ({
    item,
    index,
    type,
    onPress,
    onChangeQuantity,
  }) => (
    <MenuDetailItem
      item={item}
      key={index + ''}
      type={type}
      onPress={onPress}
      onChangeQuantity={onChangeQuantity}
    />
  );

  const onRenderItem = ({ item, index }) => {
    return (
      <CustomAccordionList
        key={item.option_id.toString()}
        input={item}
        headerTextStyle={styles.listHeaderTextStyle}
        headerStyle={styles.listHeaderStyle}
        style={styles.listStyle}
        renderItem={renderOptionsItem}
        renderSelectItem={onRenderSelectedItem}
        onChangeOptionsItem={onChangeOptionsItem}
        openFirst={index === 0}
      />
    );
  };

  const onRenderHeader = React.useCallback(() => {
    const { image, name, point, price_range } = productItem || {};
    return (
      <ProductItemDetailHeader
        image={image}
        name={name}
        point={point}
        price_range={price_range}
      />
    );
  }, [productItem]);

  const onIncreaseQuantity = () => {
    setQyt((prev) => prev + 1);
  };

  const onDecreaseQuantity = () => {
    setQyt((prev) => prev - 1);
  };

  const onRenderFooter = () => (
    <ProductItemDetailFooter
      quantity={qty}
      increase={onIncreaseQuantity}
      decrease={onDecreaseQuantity}
      loading={loading}
    />
  );

  React.useEffect(() => {
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { items } = productItem || {};
  // Logger.debug(items, '=====> items');
  return (
    <Animated.View style={[styles.container, customSpringStyles]} ref={aref}>
      <View style={styles.content}>
        <ProductDetailFlatList
          data={items?.filter((x) => x.title !== 'Main')}
          renderItem={onRenderItem}
          renderHeader={onRenderHeader}
          renderFooter={onRenderFooter}
        />
      </View>

      <CustomButton
        onPress={() => navigation.goBack()}
        absolute={true}
        style={styles.closeButtonStyle}>
        <Image source={images.icons.popup_close} />
      </CustomButton>

      <View style={styles.confirmStyle}>
        {renderSummaryPrice()}
        <ButtonCC.ButtonRed
          label={
            detailItem ? translate('txtUpdateCart') : translate('txtAddCart')
          }
          onPress={detailItem ? updateCartProduct : addProductToCart}
        />
      </View>
    </Animated.View>
  );
};

const MIN_HEIGHT = 289;
const TOTAL_HEIGHT = 145;
const ORDER_AMOUNT_HEIGHT = 120;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
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
    marginTop: 20,
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
    height: scaleHeight(72),
  },

  closeButtonStyle: {
    top: 45,
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
    paddingBottom: 20,
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

  placeholderHead: {
    backgroundColor: AppStyles.colors.white,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    paddingTop: scaleHeight(100),
    flex: 0,
    marginBottom: scaleHeight(20),
  },
  placeholderContent: {
    backgroundColor: AppStyles.colors.white,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
    flex: 0,
  },
  placeholderImage: {
    height: 250,
    width: '100%',
    marginBottom: 15,
    borderRadius: scaleWidth(14),
  },
  placeholderLine: { marginBottom: 15 },
  placeholderHorizontal: {
    ...AppStyles.styles.horizontalLayout,
    width: '100%',
  },
});

export default MenuItemDetailScreen;
