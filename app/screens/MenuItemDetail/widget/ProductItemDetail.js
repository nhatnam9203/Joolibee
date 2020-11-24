import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import { CustomAccordionList, CustomButton, CustomInput } from '@components';
import { GCC, GEX } from '@graphql';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
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
import { destructuring, format, scale } from '@utils';
import { JollibeeImage } from '../../components';
import {
  productReducer,
  increaseQuantity,
  decreaseQuantity,
} from '../ProductState';

const { scaleHeight, scaleWidth } = scale;
const { width, height } = Dimensions.get('window');

const ProductItemInfoLoading = () => {
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
};

export const ProductItemDetailHeader = React.memo(
  ({ image, name, point, price_range }) => {
    const { sellPrice, showPrice } = destructuring.priceOfRange(price_range);
    Logger.debug('ProductItemDetailHeader', 'ProductItemDetailHeader');
    return (
      <View style={styles.header}>
        <JollibeeImage
          url={image?.url}
          width={width}
          height={scaleHeight(348)}
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
  },
);

export const ProductItemDetailFooter = React.memo(
  ({ quantity = 1, increase, decrease }) => {
    return (
      <View style={styles.orderContentStyle}>
        <View style={styles.orderAmountStyle}>
          <CustomButton
            style={styles.buttonOrderStyle}
            onPress={decrease}
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
            onPress={increase}
            disabled={quantity > 255}
            borderRadius={6}>
            <Image source={images.icons.ic_plus} />
          </CustomButton>
        </View>
      </View>
    );
  },
);

const MIN_HEIGHT = 289;
const TOTAL_HEIGHT = 145;
const ORDER_AMOUNT_HEIGHT = 120;

const styles = StyleSheet.create({
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

  header: {
    flex: 0,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingBottom: 20,
    marginBottom: 10,
    ...AppStyles.styles.shadow,
  },

  headerContent: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  priceContent: {
    marginLeft: 15,
    alignItems: 'flex-end',
  },

  txtPriceStyle: {
    ...AppStyles.fonts.title,
    fontSize: scaleWidth(21),
    color: AppStyles.colors.accent,
  },

  txtFrontDiscountStyle: {
    ...AppStyles.fonts.header,
    color: '#707070',
    fontSize: scaleWidth(18),
    textDecorationLine: 'line-through',
  },

  txtPointStyle: {
    ...AppStyles.fonts.medium,
    color: '#707070',
    fontSize: scaleWidth(14),
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
});
