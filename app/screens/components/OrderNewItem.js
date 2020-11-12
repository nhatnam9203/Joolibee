import { AppStyles, images } from '@theme';
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { FlatListItemWithImgHorizontal } from './FlatListItemWithImgHorizontal';
import { LabelTitle } from './LabelTitle';
import { ButtonRed } from './ButtonCC';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const IMAGE_SIZE = scaleHeight(177);

export const OrderNewItem = ({ item, onPress, shadow, updateQty }) => {
  const { product = {}, quantity, prices = {} } = item;

  const [qty, setQuantity] = React.useState(quantity);

  const handleUpdateProduct = (value) => () => {
    let newItem = { ...item };
    setQuantity(value);
    newItem.quantity = value;
    updateQty(newItem);
  };

  const PriceAndPoint = ({ point, prices }) => {
    return (
      <View style={styles.priceContent}>
        <Text style={styles.priceStyle}>
          {/* {format.jollibeeCurrency(prices?.price)} */}
          10.000
        </Text>
        <Text style={styles.pointStyle}>(+ {`${point}`} điểm)</Text>
      </View>
    );
  };

  return (
    <FlatListItemWithImgHorizontal
      style={styles.container}
      imgStyle={styles.imageStyle}
      contentStyle={styles.itemStyle}
      image={product?.image?.url || images.jollibee_combo}
      onPress={onPress}
      imgPosition="left"
      imgWidth={IMAGE_SIZE}
      imgHeight={IMAGE_SIZE}
      shadow={shadow}>
      <LabelTitle
        label="zxczcsadsadsad zxczcsadsadsad"
        numberOfLines={2}
        fontSize={scaleHeight(15)}
        style={styles.titleStyle}
      />
      <PriceAndPoint point={10} prices={prices} />

      <ButtonRed
        style={{ marginVertical: 0 }}
        height={45}
        width={scaleWidth(147)}
        label="MUA NGAY"
        onPress={() => {}}
      />
    </FlatListItemWithImgHorizontal>
  );
};

const styles = StyleSheet.create({
  imageStyle: { alignSelf: 'flex-start' },
  itemStyle: {
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    padding: 10,
    height: '100%',
  },

  container: {
    width: scaleWidth(345),
    height: scaleHeight(171),
    borderRadius: 14,
  },

  titleStyle: { marginVertical: 0, marginBottom: 0 },

  txtDescStyle: {
    ...AppStyles.fonts.text,
    fontSize: 12,
    color: '#000000',
  },

  bottomStyle: {
    // alignItems: 'center',
    width: '100%',
  },

  buttonStyle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E9E9E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  priceStyle: {
    ...AppStyles.fonts.title,
    color: AppStyles.colors.accent,
    fontSize: 16,
  },

  pointStyle: {
    ...AppStyles.fonts.medium,
    fontSize: 14,
    color: '#484848',
  },

  priceContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
});
