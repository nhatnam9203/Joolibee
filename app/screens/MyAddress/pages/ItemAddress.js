import { AppStyles, images, metrics } from '@theme';
import { translate } from '@localize';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Image, Text } from 'react-native';
import { scale, format } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const index = ({ item, onPress }) => {
  const onHandlePress = () => {
    onPress(item);
  };
  return (
    <TouchableOpacity onPress={onHandlePress} style={styles.itemContainer}>
      <View style={styles.addressImage}>
        <Image source={images.icons.ic_address} />
      </View>

      <View style={styles.content}>
        <View style={styles.placeContainer}>
          <Text style={AppStyles.fonts.medium}>
            {format.translatePlaceAddress(item.company)}
          </Text>
          {item?.default_shipping && (
            <View style={styles.defaultShippingContainer}>
              <Text style={styles.txtDefaultShipping}>
                {translate('txtDefaultAddress')}
              </Text>
            </View>
          )}
        </View>
        <Text numberOfLines={1} style={styles.txtFullAddress}>
          {item.full_address}
        </Text>
      </View>

      <Image source={images.icons.ic_arrow} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addressImage: {
    backgroundColor: '#E31837',
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 10,
  },

  itemContainer: {
    backgroundColor: '#fff',
    height: scaleHeight(75),
    flex: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: metrics.padding + 5,
    marginVertical: scaleHeight(2),
  },
  content: {
    paddingHorizontal: scaleWidth(10),
    width: '85%',
  },
  txtFullAddress: {
    ...AppStyles.fonts.mini,
    fontSize: 14,
  },
  txtTitle: {
    fontSize: 21,
    marginHorizontal: 15,
    marginVertical: 5,
  },
  txtDefaultShipping: {
    ...AppStyles.fonts.medium,
    fontSize: 12,
  },
  placeContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  defaultShippingContainer: {
    backgroundColor: AppStyles.colors.button,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    width: scaleWidth(102),
    height: scaleHeight(19),
    marginLeft: 5,
  },
});
export default index;
