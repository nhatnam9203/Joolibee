import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { AppStyles, images } from '@theme';
import { FlatListItemWithImgHorizontal } from './FlatListItemWithImgHorizontal';
import { LabelTitle } from './LabelTitle';
import { PriceAndPoint } from './PriceAndPoint';
import { OrderCount } from './OrderCount';

const IMAGE_SIZE = 69;

export const OrderItem = ({ item, onPress, shadow }) => {
  const { product = {}, quantity, prices } = item;

  const [qty, setQuantity] = React.useState(quantity);

  const handleUpdateProduct = (value) => () => {
    let newItem = { ...item };
    setQuantity(value);
    newItem.quantity = value;
    onPress(newItem);
  };
  return (
    <FlatListItemWithImgHorizontal
      imgStyle={styles.imageStyle}
      contentStyle={styles.itemStyle}
      image={{ uri: product?.image?.url }}
      onPress={() => {}}
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
        <PriceAndPoint
          style={styles.priceStyle}
          point={product.point}
          prices={prices}
        />
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
  imageStyle: { alignSelf: 'flex-start', marginTop: 20 },
  itemStyle: {},

  content: { alignItems: 'flex-start' },

  txtContent: {
    flex: 1,
    marginHorizontal: 5,
  },

  priceStyle: {
    flex: 0,
  },

  titleStyle: { marginVertical: 5 },

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
