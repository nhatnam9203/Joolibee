import { AppStyles, images } from '@theme';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Placeholder, PlaceholderMedia, Fade } from 'rn-placeholder';
import { JollibeeImage } from './JollibeeImage';
import { format } from '@utils';
import { translate } from '@localize';

const MENU_DETAIL_HEIGHT = 238;
const BOTTOM_DETAIL_HEIGHT = 86;

export const MenuItemLoading = () => (
  <Placeholder style={styles.container} Animation={Fade}>
    <View style={styles.content}>
      <PlaceholderMedia style={styles.placeholderMedia} color="#fff" />
      <View style={styles.textContentStyle} />
    </View>
  </Placeholder>
);

export const MenuItem = ({ item, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <View style={styles.content}>
      <JollibeeImage
        style={styles.imageStyle}
        url={item.thumbnail_image}
        defaultSource={images.menu_3}
      />
      <View style={styles.textContentStyle}>
        {!!item?.name && <Text style={styles.textStyle}>{`${item.name}`}</Text>}
      </View>
    </View>
  </TouchableOpacity>
);

export const MenuProductItem = ({
  item: {
    id,
    name,
    image: { url },
    point = 0,
    sku,
    price_range: { maximum_price, minimum_price },
  },
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.container, { height: MENU_DETAIL_HEIGHT }]}
    onPress={onPress}>
    <View style={styles.content}>
      <JollibeeImage
        style={styles.imageStyle}
        url={url}
        defaultSource={images.menu_3}
      />
      <View style={[styles.bottomStyle, { height: BOTTOM_DETAIL_HEIGHT }]}>
        <Text style={styles.textStyle} numberOfLines={2}>
          {`${name}`}
        </Text>
        <View style={styles.priceContent}>
          <Text style={styles.priceStyle}>
            {format.jollibeeCurrency(maximum_price?.final_price)}
          </Text>
          {point > 0 && (
            <Text style={styles.pointStyle}>
              {`(+${point} ${translate('txtPoint')})`}
            </Text>
          )}
        </View>
      </View>
    </View>
  </TouchableOpacity>
);

const MENU_HEIGHT = 198;
const TEXT_HEIGHT = 45;
const BOTTOM_HEIGHT = 55;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    height: MENU_HEIGHT,
    margin: 10,
    ...AppStyles.styles.shadow,
  },

  content: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 6,
    backgroundColor: '#fff',
  },

  imageStyle: {
    flex: 1,
    resizeMode: 'center',
  },

  textContentStyle: {
    height: TEXT_HEIGHT,
    backgroundColor: AppStyles.colors.accent,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0,
  },

  textStyle: {
    textAlign: 'left',
    textAlignVertical: 'center',
    ...AppStyles.fonts.bold,
    color: '#fff',
    fontSize: 14,
  },

  placeholderMedia: {
    width: '100%',
    height: MENU_HEIGHT - TEXT_HEIGHT,
    backgroundColor: '#fff',
  },

  bottomStyle: {
    backgroundColor: AppStyles.colors.accent,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 0,
    paddingHorizontal: 10,
    height: BOTTOM_HEIGHT,
  },

  priceContent: {
    ...AppStyles.styles.horizontalLayout,
    width: '100%',
    marginTop: 5,
  },

  priceStyle: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    fontSize: 16,
    color: '#fff',
  },

  pointStyle: {
    ...AppStyles.fonts.regular,
    fontSize: 12,
    color: '#fff',
  },
});
