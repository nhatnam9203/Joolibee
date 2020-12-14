import { translate } from '@localize';
import { AppStyles, images, metrics } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { scaleWidth, scaleHeight } = scale;
export const NotificationItem = ({ item, onPress }) => {
  const onHandlePress = () => {
    if (typeof onPress === 'function') {
      onPress(item);
    }
  };

  return (
    <TouchableOpacity onPress={onHandlePress} style={styles.itemContainer}>
      <View style={styles.addressImage}>
        <Image
          source={
            item?.is_read
              ? images.icons.ic_notification
              : images.icons.ic_notification_new
          }
        />
      </View>

      <View style={styles.content}>
        <View style={styles.placeContainer}>
          <Text style={AppStyles.fonts.medium}>
            {item?.title ?? translate('txtNotification')}
          </Text>
        </View>
        {!!item?.content && (
          <Text numberOfLines={1} style={styles.txtFullAddress}>
            {item?.content}
          </Text>
        )}
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
