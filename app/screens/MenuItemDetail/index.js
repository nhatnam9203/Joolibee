import { CustomAccordionList, CustomButton, CustomInput } from '@components';
import { GCC, GEX } from '@graphql';
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
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import {
  ButtonCC,
  JollibeeImage,
  MenuDetailItem,
  MenuOptionSelectedItem,
} from '../components';
import { productReducer, setProduct, updateOption } from './ProductState';

const { scaleHeight, scaleWidth } = scale;
const { width, height } = Dimensions.get('window');
const ANIMATION_DURATION = 800;
const CART_ICON_X = scaleWidth(25);
const CART_ICON_Y = scaleHeight(65);

const MenuItemDetailScreen = ({ route = { params: {} } }) => {
  const navigation = useNavigation();

  const viewScale = useSharedValue(1);
  const offsetX = useSharedValue(0);
  const aref = useAnimatedRef();

  const { productSku, detailItem } = route.params;

  const [quantity, setQuantity] = React.useState(1);
  const [productItemDetail, dispatchChangeProduct] = React.useReducer(
    productReducer,
    null,
  );

  const { addProductsToCart } = GEX.useAddProductsToCart();

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

  const renderHeader = (isLoading) => {
    if (isLoading || !productItemDetail) {
      return (
        <Placeholder style={styles.placeholderHead} Animation={Fade}>
          <PlaceholderMedia style={styles.placeholderImage} />
          <View style={styles.placeholderHorizontal}>
            <PlaceholderLine
              width={'60%'}
              height={20}
              style={styles.placeholderLine}
            />
            <PlaceholderLine
              width={30}
              height={25}
              style={styles.placeholderLine}
            />
          </View>
          <View style={styles.placeholderHorizontal}>
            <PlaceholderLine
              width={'60%'}
              height={20}
              style={styles.placeholderLine}
            />
            <PlaceholderLine
              width={20}
              height={15}
              style={styles.placeholderLine}
            />
          </View>
          <PlaceholderLine
            width={'60%'}
            height={20}
            style={styles.placeholderLine}
          />
        </Placeholder>
      );
    }

    const { image, name, point, price_range } = productItemDetail;
    const { sellPrice, showPrice } = destructuring.priceOfRange(price_range);

    return (
      <View style={styles.header}>
        <JollibeeImage style={styles.imageHeaderStyle} url={image?.url} />

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
        key={item.id}
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
    if (!productItemDetail) {
      return <></>;
    }

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
    // Logger.debug(detailItem, 'onReceivedProduct');

    if (detailItem?.bundle_options.length > 0) {
      const { items } = item;
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
              return Object.assign({}, opt, { is_default: true });
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
        setProduct(Object.assign({}, item, { items: list })),
      );
    } else {
      dispatchChangeProduct(setProduct(item));
    }
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
    // if (!productItemDetail) return;

    const { sku, items = [] } = productItemDetail;
    const optionsMap = [];

    items.forEach((item) => {
      const { options = [] } = item;
      const mapArr = options
        .filter((x) => x.is_default === true)
        .map((x) => x.uid);

      optionsMap.push(...mapArr);
    });
    // Logger.debug(optionsMap, 'options');
    addProductsToCart({
      variables: {
        cart_items: [
          {
            quantity: quantity,
            sku: sku,
            selected_options: optionsMap,
            // entered_options: [

            // ]
          },
        ],
      },
    });

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
    // dispatch(app.showOrderList());
  };

  return (
    <Animated.View style={[styles.container, customSpringStyles]} ref={aref}>
      <View style={styles.content}>
        <GCC.QueryProductDetail
          sku={productSku}
          renderHeader={() => renderHeader()}
          renderItem={renderItem}
          renderFooter={renderFooter}
          updateProductItemDetail={onReceivedProduct}
          optionData={productItemDetail?.items}
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
          onPress={addProductToCart}
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
    height: 46,
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
