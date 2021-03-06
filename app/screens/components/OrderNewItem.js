import { translate } from '@localize';
import { AppStyles } from '@theme';
import { destructuring, format, scale } from '@utils';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Fade,
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
} from 'rn-placeholder';
import { ButtonRed } from './ButtonCC';
import { FlatListItemWithImgHorizontal } from './FlatListItemWithImgHorizontal';
import { LabelTitle } from './LabelTitle';

const { scaleHeight, scaleWidth } = scale;
const IMAGE_SIZE = scaleHeight(165);

export const OrderNewItemLoading = () => (
  <FlatListItemWithImgHorizontal
    style={styles.container}
    imgStyle={styles.imageStyle}
    contentStyle={styles.itemStyle}
    imgPosition="left"
    imgWidth={IMAGE_SIZE}
    imgHeight={IMAGE_SIZE}
    shadow={true}>
    <Placeholder Animation={Fade}>
      <PlaceholderLine height={15} />
      <PlaceholderLine height={15} />
      <PlaceholderLine height={15} />
      <PlaceholderMedia style={styles.mediaPlaceholder} />
    </Placeholder>
  </FlatListItemWithImgHorizontal>
);

export const OrderNewItem = ({
  item,
  onPress = () => {},
  shadow,
  updateQty,
  loading = false,
}) => {
  const PriceAndPoint = ({ point = 0, price_range }) => {
    const { sellPrice } = destructuring.priceOfRange(price_range);

    return (
      <View style={styles.priceContent}>
        {sellPrice && (
          <Text style={styles.priceStyle}>
            {format.jollibeeCurrency(sellPrice)}
          </Text>
        )}
        <Text style={styles.pointStyle}>
          (+ {`${point} ${translate('txtPoint')}`} )
        </Text>
      </View>
    );
  };

  const ListItem = (value) => {
    const { image, id, name = '', price_range, point = 0, is_hot = false } =
      value?.item || {};

    return (
      <FlatListItemWithImgHorizontal
        style={styles.container}
        imgStyle={styles.imageStyle}
        contentStyle={styles.itemStyle}
        image={image?.url}
        onPress={onPress}
        imgPosition="left"
        imgWidth={IMAGE_SIZE}
        imgHeight={IMAGE_SIZE}
        shadow={shadow}
        key={`${id}`}
        hotIcon={is_hot}>
        <LabelTitle
          label={name}
          numberOfLines={2}
          fontSize={scaleHeight(16)}
          style={styles.titleStyle}
        />

        {price_range && (
          <PriceAndPoint price_range={price_range} point={point} />
        )}

        <ButtonRed
          height={scaleHeight(50)}
          width={scaleHeight(145)}
          borderRadius={10}
          label={translate('txtBuyNow')}
          textStyle={styles.buttonTextStyle}
          onPress={onPress}
        />
      </FlatListItemWithImgHorizontal>
    );
  };

  return loading ? <OrderNewItemLoading /> : <ListItem item={item} />;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },

  imageStyle: {
    alignSelf: 'flex-start',
    borderRadius: 14,
  },

  itemStyle: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  titleStyle: {},

  txtDescStyle: {
    ...AppStyles.fonts.text,
    fontSize: 12,
    color: '#000000',
  },

  bottomStyle: {
    // alignItems: 'center',
    width: '100%',
  },

  buttonTextStyle: {
    ...AppStyles.fonts.bold,
    fontSize: scaleHeight(14),
  },

  priceStyle: {
    ...AppStyles.fonts.title,
    color: AppStyles.colors.accent,
    fontSize: scaleHeight(16),
  },

  pointStyle: {
    ...AppStyles.fonts.medium,
    fontSize: scaleHeight(16),
    color: '#484848',
  },

  priceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },

  mediaPlaceholder: {
    width: 120,
    height: 40,
  },
});
