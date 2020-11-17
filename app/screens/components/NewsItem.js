import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { AppStyles } from '@theme';
import { CustomHTML } from '@components';
import { JollibeeImage } from './JollibeeImage';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;

export const NewsItem = ({
  item,
  index,
  onPress,
  width = 265,
  height = 264,
}) => {
  const { title, short_content, featured_image } = item || {};
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View
        style={[
          styles.containerItem,
          {
            width: scaleWidth(width),
            height: scaleHeight(height),
          },
        ]}>
        <View style={styles.topContent}>
          <JollibeeImage style={styles.imgProduct} url={featured_image} />
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
    elevation: 10,
    overflow: 'hidden',
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
