import { AppStyles, images } from '@theme';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatListItemWithImgHorizontal } from './FlatListItemWithImgHorizontal';
import { LabelTitle } from './LabelTitle';
import { OrderCount } from './OrderCount';
import { PriceAndPoint } from './PriceAndPoint';

const IMAGE_SIZE = 69;

export const OrderItem = ({ item, onPress, shadow, updateQty }) => {
  const { product = {}, quantity, prices = {} } = item;

  const [qty, setQuantity] = React.useState(quantity);

  const handleUpdateProduct = (value) => () => {
    let newItem = { ...item };
    setQuantity(value);
    newItem.quantity = value;
    updateQty(newItem);
  };

  return (
    <FlatListItemWithImgHorizontal
      imgStyle={styles.imageStyle}
      contentStyle={styles.itemStyle}
      image={product?.image?.url || images.jollibee_combo}
      onPress={onPress}
      imgPosition="left"
      imgWidth={IMAGE_SIZE}
      imgHeight={IMAGE_SIZE}
      shadow={shadow}>
      <View style={[AppStyles.styles.horizontalLayout, styles.content]}>
        <View style={styles.txtContent}>
          <LabelTitle
            label={product.name}
            numberOfLines={2}
            fontSize={15}
            style={styles.titleStyle}
          />
          <Text style={styles.txtDescStyle}>{product.meta_description}</Text>
        </View>
        {/* <PriceAndPoint
          style={styles.priceStyle}
          point={product?.point}
          prices={prices}
        /> */}
      </View>

      <View style={styles.bottomStyle}>
        <OrderCount defaultValue={qty + ''} onPress={handleUpdateProduct} />
        <TouchableOpacity style={styles.buttonStyle}>
          <Image source={images.icons.ic_order_edit} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleUpdateProduct(0)}
          style={styles.buttonStyle}>
          <Image source={images.icons.ic_delete} />
        </TouchableOpacity>
      </View>
    </FlatListItemWithImgHorizontal>
  );
};

const styles = StyleSheet.create({
  imageStyle: { alignSelf: 'flex-start' },
  itemStyle: {},

  content: {
    alignItems: 'flex-start',
    marginTop: 10,
  },

  txtContent: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },

  priceStyle: {
    flex: 0,
  },

  titleStyle: { marginVertical: 0, marginBottom: 10 },

  txtDescStyle: {
    ...AppStyles.fonts.text,
    fontSize: 12,
    color: '#000000',
  },

  bottomStyle: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
