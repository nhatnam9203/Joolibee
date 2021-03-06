import { AppStyles, images } from '@theme';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import {
  Placeholder,
  PlaceholderMedia,
  PlaceholderLine,
  Fade,
} from 'rn-placeholder';
import { JollibeeImage } from './JollibeeImage';
import { format, scale } from '@utils';
import { translate } from '@localize';
const windowWidth = Dimensions.get('window').width;

const MENU_DETAIL_HEIGHT = 238;
const BOTTOM_DETAIL_HEIGHT = 86;

export const MenuItemLoading = () => (
  <Placeholder style={styles.container} Animation={Fade}>
    <View style={styles.content}>
      <View style={[styles.imageStyle, styles.centerStyle]}>
        <PlaceholderMedia color="#fff" style={styles.imagePlaceholderStyle} />
      </View>
      <View style={[styles.textPlaceholderStyle, styles.centerStyle]}>
        <PlaceholderLine height={10} />
      </View>
    </View>
  </Placeholder>
);

export const MenuItem = ({ item, onPress, color }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    {/* <View style={[styles.content, { backgroundColor: color.background }]}> */}
    <View style={[styles.content]}>
      {item.id === 0 ? (
        <JollibeeImage
          // url={item.category_image}
          width="100%"
          height="84%"
          defaultSource={images.menu_combo_hot}
          resizeMode="contain"
        />
      ) : (
        <JollibeeImage
          url={item.image}
          width="100%"
          height="100%"
          defaultSource={images.menu_3}
          resizeMode="contain"
        />
      )}
      <View style={styles.textContentStyle}>
        {!!item?.name && (
          <Text
            style={[
              styles.textStyle,
              { color: color.textColor },
            ]}>{`${item.name}`}</Text>
        )}
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

const MENU_HEIGHT = (windowWidth - 30) / 2;
const TEXT_HEIGHT = 45;
const BOTTOM_HEIGHT = 55;

const styles = StyleSheet.create({
  container: {
    height: MENU_HEIGHT,
    width: MENU_HEIGHT,
    margin: 5,
    ...AppStyles.styles.shadowStrong,
  },

  content: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: 14,
    backgroundColor: '#fff',
  },

  imagePlaceholderStyle: {
    width: '90%',
    height: '90%',
    alignSelf: 'center',
  },

  textContentStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: scale.scaleHeight(60),
  },

  textStyle: {
    textAlign: 'left',
    textAlignVertical: 'center',
    ...AppStyles.fonts.bold,
    color: '#fff',
    fontSize: 18,
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

  centerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  textPlaceholderStyle: {
    height: TEXT_HEIGHT,
    paddingTop: 10,
  },
});
