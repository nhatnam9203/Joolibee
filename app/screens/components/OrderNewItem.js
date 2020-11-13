import { AppStyles, images } from '@theme';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FlatListItemWithImgHorizontal } from './FlatListItemWithImgHorizontal';
import { LabelTitle } from './LabelTitle';
import { ButtonRed } from './ButtonCC';
import { scale } from '@utils';
import { translate } from '@localize';
import { format, destructuring } from '@utils';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';

const { scaleWidth, scaleHeight } = scale;
const IMAGE_SIZE = scaleHeight(177);

const OrderItemLoading = () => (
  <FlatListItemWithImgHorizontal
    style={styles.container}
    imgStyle={styles.imageStyle}
    contentStyle={styles.itemStyle}
    imgPosition="left"
    imgWidth={IMAGE_SIZE}
    imgHeight={IMAGE_SIZE}
    shadow={true}>
    <Placeholder>
      <PlaceholderLine width={'100%'} height={15} />
      <PlaceholderLine width={'100%'} height={15} />
      <PlaceholderLine width={'30%'} height={15} />
      <PlaceholderMedia style={styles.mediaPlaceholder} />
    </Placeholder>
  </FlatListItemWithImgHorizontal>
);

export const OrderNewItem = ({
  item,
  onPress,
  shadow,
  updateQty,
  loading = false,
}) => {
  const handleUpdateProduct = (value) => () => {
    let newItem = { ...item };
    // setQuantity(value);
    newItem.quantity = value;
    updateQty(newItem);
  };

  const PriceAndPoint = ({ point, price_range }) => {
    const { sellPrice, showPrice } = destructuring.priceOfRange(price_range);

    return (
      <View style={styles.priceContent}>
        <Text style={styles.priceStyle}>
          {format.jollibeeCurrency(sellPrice)}
        </Text>
        <Text style={styles.pointStyle}>(+ {`${point}`} điểm)</Text>
      </View>
    );
  };

  const ListItem = (value) => {
    const { image, id, sku, name, price_range, point } = value?.item;

    return (
      <FlatListItemWithImgHorizontal
        style={styles.container}
        imgStyle={styles.imageStyle}
        contentStyle={styles.itemStyle}
        image={image?.url || images.jollibee_combo}
        onPress={onPress}
        imgPosition="left"
        imgWidth={IMAGE_SIZE}
        imgHeight={IMAGE_SIZE}
        shadow={shadow}
        key={`${id}`}>
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
          onPress={() => {}}
        />
      </FlatListItemWithImgHorizontal>
    );
  };

  return loading ? <OrderItemLoading /> : <ListItem item={item} />;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleHeight(180),
  },

  imageStyle: {
    alignSelf: 'flex-start',
    borderRadius: 14,
  },

  itemStyle: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 10,
    height: '100%',
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
    marginVertical: 10,
  },

  mediaPlaceholder: {
    width: 120,
    height: 30,
  },
});
