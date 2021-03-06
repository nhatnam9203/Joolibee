import { CustomHTML } from '@components';
import { AppStyles } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
const { scaleWidth, scaleHeight } = scale;

export const NewsItem = ({ item, index, onPress }) => {
  const { title, short_content, featured_image } = item || {};

  const onShowDetail = () => {
    if (typeof onPress === 'function') {
      onPress(item);
    }
  };

  return (
    <TouchableOpacity onPress={onShowDetail} activeOpacity={0.7}>
      <View style={styles.containerItem}>
        <View style={styles.topContent}>
          <FastImage
            style={styles.imgProduct}
            source={{ uri: featured_image }}
          />
        </View>
        <View style={styles.bottomContent}>
          <Text style={styles.txttitle}>{title}</Text>
          <CustomHTML
            html={short_content}
            renderers={{
              div: (...props) => {
                return (
                  <Text
                    key={props[3].index + ''}
                    style={styles.txtContent}
                    numberOfLines={1}>
                    {props[3]?.rawChildren[0].data}
                  </Text>
                );
              },
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerItem: {
    backgroundColor: AppStyles.colors.white,
    borderRadius: 16,
    shadowColor: '#00000090',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    height: scaleHeight(220),
  },
  topContent: {
    height: '62%',
  },
  bottomContent: {
    padding: 10,
    justifyContent: 'center',
  },

  txttitle: {
    ...AppStyles.fonts.bold,
    fontWeight: '500',
    fontSize: scaleWidth(16),
  },
  txtContent: {
    ...AppStyles.fonts.mini,
    color: AppStyles.colors.text,
    paddingTop: 2,
  },
  imgProduct: {
    flex: 1,
    resizeMode: 'stretch',
  },
});
