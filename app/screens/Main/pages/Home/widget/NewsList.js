import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import { Text } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { AppStyles } from '@theme';
import { CustomButton, CustomHTML } from '@components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get('window');

const index = ({ openDetail, onCHangeScreen, data, loading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text
          style={[
            AppStyles.fonts.title,
            { color: AppStyles.colors.text, fontSize: scaleWidth(32) },
          ]}>
          Tin Tức
        </Text>

        <TouchableOpacity onPress={onCHangeScreen}>
          <Text style={styles.txtSeeAll}>XEM TẤT CẢ</Text>
        </TouchableOpacity>
      </View>

      <Carousel
        keyExtractor={(item, index) => index + ''}
        data={loading ? [1, 2, 3] : data}
        renderItem={(item, index) =>
          loading ? renderItemLoading() : renderItem(item, index, openDetail)
        }
        sliderWidth={width}
        itemWidth={width}
        hasParallaxImages={true}
        enableSnap={true}
        loop={true}
        autoplay={!loading}
        autoplayInterval={5000}
        autoplayDelay={3000}
        removeClippedSubviews={false}
        useScrollView={true}
        lockScrollWhileSnapping={true}
        horizontal
        loopClonesPerSide={2}
      />
    </View>
  );
};

const renderItem = (item, index, onPress) => {
  const { title, short_content } = item?.item || {};
  return (
    <View style={styles.wrapperItem}>
      <View style={[styles.containerItem, AppStyles.styles.shadow]}>
        <View style={styles.imgLoading}>
          <Image
            source={{
              uri:
                'http://dev.jollibee.levincitest.com/media/mageplaza/bannerslider/banner/image/e/a/ea8ad72ff489c5-ba49262adc1c26427f0d_1.png',
            }}
            style={styles.imgProduct}
          />
        </View>

        <View style={styles.content}>
          <Text style={[AppStyles.fonts.medium_SVN, styles.txttitle]}>
            {title}
          </Text>

          <CustomHTML
            html={short_content}
            renderers={{
              div: (...props) => {
                return (
                  <Text
                    key={props[3].key}
                    style={styles.txtContent}
                    numberOfLines={3}>
                    {props[3]?.rawChildren[0].data}
                  </Text>
                );
              },
            }}
          />
        </View>

        <View style={styles.btn}>
          <CustomButton
            onPress={onPress}
            label={'XEM THÊM'}
            width={134}
            height={43}
            bgColor={AppStyles.colors.button}
          />
        </View>
      </View>
    </View>
  );
};

const renderItemLoading = () => {
  const flex_start_style = { alignSelf: 'flex-start' };
  return (
    <Placeholder Animation={Fade} style={styles.wrapperItem}>
      <View style={styles.containerItem}>
        <View style={styles.imgLoading}>
          <PlaceholderMedia style={styles.imgProduct} />
        </View>

        <PlaceholderLine height={15} />
        <PlaceholderLine height={10} style={flex_start_style} />
        <PlaceholderLine height={10} style={flex_start_style} />
        <PlaceholderLine height={10} style={flex_start_style} />
        <PlaceholderLine height={40} width={35} style={styles.btnLoading} />
      </View>
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: AppStyles.colors.cyan,
    top: -90,
    alignItems: 'center',
    paddingHorizontal: scaleWidth(15),
  },

  containerTop: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: scaleHeight(10),
  },

  wrapperItem: {
    width: '100%',
    paddingTop: scaleHeight(60),
    paddingBottom: scaleHeight(40),
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },

  containerItem: {
    width: '100%',
    height: scaleHeight(320),
    alignItems: 'center',
    backgroundColor: AppStyles.colors.white,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
  },

  content: {
    paddingHorizontal: scaleWidth(10),
    top: scaleHeight(-25),
  },

  txttitle: {
    color: AppStyles.colors.text,
    fontSize: scaleWidth(16),
    textAlign: 'center',
  },
  txtContent: {
    color: AppStyles.colors.text,
    textAlign: 'left',
    fontSize: scaleWidth(14),
    ...AppStyles.fonts.text,
  },
  imgProduct: {
    width: scaleWidth(281),
    height: scaleHeight(174),
    // resizeMode: 'center',
    top: scaleHeight(-60),
    position: 'absolute',
    zIndex: 100000,
  },
  btn: {
    position: 'absolute',
    bottom: 20,
    left: 15,
  },
  btnLoading: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    marginTop: 10,
  },
  imgLoading: {
    width: scaleWidth(281),
    height: scaleHeight(130),
    marginBottom: 15,
  },

  txtSeeAll: {
    textDecorationLine: 'underline',
    ...AppStyles.fonts.bold,
    fontSize: 14,
  },
});

export default index;
