import { AppStyles, images } from '@theme';
import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { CustomButtonImage } from '@components';
import { OrderCount } from '../../components';
import { format } from '@utils';
import NavigationService from '../../../navigation/NavigationService';
import { translate } from '@localize';

export const OrderItem = ({ item, updateMyCart, onPress }) => {
  const { product = {}, quantity, prices } = item || {};
  const _price = format.jollibeeCurrency(prices.price);

  const [qty, setQuantity] = React.useState(quantity);

  const onConfirmDeleteProduct = () => {
    NavigationService.showConfirm(
      translate('txtConfirm'),
      translate('txtDeleteProductCart'),
      () => {
        handleUpdateProduct(0);
      },
    );
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
    handleUpdateProduct(qty + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => prev - 1);
    handleUpdateProduct(qty - 1);
  };

  const handleUpdateProduct = (value) => {
    let newItem = { ...item };
    setQuantity(value);
    newItem.quantity = value;
    updateMyCart(newItem);
  };

  React.useEffect(() => {
    setQuantity(quantity);
  }, [quantity]);

  return (
    <View style={styles.content}>
      <View style={[AppStyles.styles.horizontalLayout, styles.subContent]}>
        <Text style={styles.titleStyle} ellipsizeMode="tail">
          {product.name}
        </Text>
        <View style={styles.orderCountContainer}>
          <OrderCount
            defaultValue={qty + ''}
            increase={increaseQuantity}
            decrease={decreaseQuantity}
            inputCustomStyle={styles.inputContainer}
          />
        </View>
        <Text style={styles.priceStyle}>{_price}</Text>
      </View>
      <View style={[AppStyles.styles.horizontalLayout, styles.subContent]}>
        <Text style={styles.descriptionStyle} ellipsizeMode="tail">
          {product.meta_description}
        </Text>

        <View style={styles.bottomStyle}>
          <CustomButtonImage
            image={images.icons.ic_delete_bg}
            onPress={onConfirmDeleteProduct}
          />
          <CustomButtonImage image={images.icons.ic_edit} onPress={onPress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: { flex: 1, paddingVertical: 10 },
  subContent: { marginVertical: 5 },
  titleStyle: {
    ...AppStyles.fonts.bold,
    fontSize: 14,
    color: AppStyles.colors.text,
    flex: 1,
  },
  orderCountContainer: { flex: 1, paddingHorizontal: 15 },
  amountStyle: {
    ...AppStyles.fonts.medium,
    color: AppStyles.colors.accent,
    fontSize: 14,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: AppStyles.colors.accent,
    marginHorizontal: 10,
    flex: 0,
  },

  priceStyle: {
    flex: 0,
    ...AppStyles.fonts.bold,
    fontSize: 16,
    color: AppStyles.colors.accent,
  },

  descriptionStyle: {
    ...AppStyles.fonts.regular,
    fontSize: 14,
    width: '50%',
  },
  bottomStyle: {
    flexDirection: 'row',
    flex: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '23%',
  },
  inputContainer: {
    minWidth: 37,
    maxWidth: 60,
    height: 32,
    borderColor: '#707070',
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
  },
});
