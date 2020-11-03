import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import { JollibeeImage } from "../../../../components";
import Carousel from 'react-native-snap-carousel';
import { format, scale } from "@utils";
import { AppStyles } from '@theme';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get('window');

const index = ({ openMenu, data, loading }) => {

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text
          style={[
            AppStyles.fonts.title,
            { color: AppStyles.colors.text, fontSize: scaleWidth(32) },
          ]}>
          Bán Chạy
        </Text>

        <TouchableOpacity
          onPress={openMenu}
        >
          <Text
            style={[
              AppStyles.fonts.medium,
              styles.txtMenu,
              { color: AppStyles.colors.text },
            ]}>
            XEM THỰC ĐƠN
        </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          top: scaleHeight(10),
        }}>
        <Carousel
          data={loading ? [1, 2, 3, 4] : data}
          renderItem={loading ? renderItemLoading : renderItem}
          keyExtractor={(item, index) => index + ''}
          sliderWidth={width}
          itemWidth={scaleWidth(180)}
          itemHeight={scaleHeight(218)}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={1}
          firstItem={0}
          autoplay={!loading}
          autoplayInterval={5000}
          loop
          loopClonesPerSide={2}
          ListEmptyComponent={renderEmptyList}
        />
      </View>
    </View>
  );
};



const renderItem = ({ item, index }) => {
  const { price_range, point, image, name } = item;
  const { maximum_price } = price_range || {};
  const _price = format.jollibeeCurrency(maximum_price?.final_price);
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => alert('ads')}
      key={index + ''}
      style={[styles.containerItem, AppStyles.styles.shadow]}>
      <JollibeeImage
        url={image?.url}
        style={styles.imgProduct}
      />
      <Text
        numberOfLines={2}
        style={[
          AppStyles.fonts.medium_SVN,
          { color: AppStyles.colors.text, fontSize: scaleWidth(13) },
        ]}>
        {name?.toUpperCase()}
      </Text>

      <View style={styles.price}>
        <Text style={[AppStyles.fonts.medium_SVN, styles.txtPrice]}>
          {_price}
        </Text>

        <Text style={[AppStyles.fonts.mini]}>(+{point} điểm)</Text>
      </View>
    </TouchableOpacity>
  );
};

const renderItemLoading = () => {

  return (
    <Placeholder
      Animation={Fade}
      style={styles.containerItemLoading}>
      <View style={styles.topLoading}>
        <PlaceholderMedia style={styles.imgProduct} />
        <PlaceholderLine width={100} />
      </View >

      <View style={styles.bottomLoading}>
        <PlaceholderLine width={40} />
        <PlaceholderLine width={30} />
      </View>
    </Placeholder>
  );
};

const renderEmptyList = () => (
  <Text style={[AppStyles.fonts.mini, { textAlign: 'center' }]}>Không có sản phẩm</Text>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleHeight(320),
    backgroundColor: AppStyles.colors.orange,
    top: -90,
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
  },

  containerTop: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: scaleHeight(15),
  },

  containerItem: {
    width: scaleWidth(180),
    height: scaleHeight(218),
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.white,
    borderRadius: scaleWidth(10),
    paddingHorizontal:10
  },

  containerItemLoading: {
    width: scaleWidth(180),
    width: scaleWidth(180),
    height: scaleHeight(218),
    backgroundColor: AppStyles.colors.white,
    padding: 10,
    borderRadius: scaleWidth(10),
  },

  topLoading: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '92%'
  },

  bottomLoading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  txtPrice: {
    color: AppStyles.colors.accent,
    fontSize: scaleWidth(16),
  },
  price: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',

  },

  txtMenu: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  imgProduct: {
    width: scaleWidth(124),
    height: scaleHeight(124),
    resizeMode: 'contain',
  },
});

export default index;
