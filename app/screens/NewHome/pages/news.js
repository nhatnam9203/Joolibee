import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
  Text,
} from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import Carousel from 'react-native-snap-carousel';
import { AppStyles, images } from '@theme';
import { CustomHTML } from '@components';
import { JollibeeImage } from '../../components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get('window');

const index = ({ openDetail, onCHangeScreen, data, loading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.txtHeader}>Tin mới nhất</Text>

        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={onCHangeScreen}>
          <Text style={styles.txtSeeAll}>XEM TẤT CẢ </Text>
          <Image source={images.icons.ic_forward_red} />
        </TouchableOpacity>
      </View>

      <Carousel
        keyExtractor={(item, index) => index + ''}
        data={loading ? [1, 2, 3] : data}
        renderItem={(item, index) =>
          loading ? renderItemLoading() : renderItem(item, index, openDetail)
        }
        sliderWidth={width}
        itemWidth={scaleWidth(265)}
        hasParallaxImages={true}
        enableSnap={true}
        loop={true}
        // autoplay={!loading}
        // autoplayInterval={5000}
        // autoplayDelay={3000}
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
  const { title, short_content, featured_image } = item?.item || {};
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.containerItem}>
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
        <PlaceholderLine height={10} width="70%" style={flex_start_style} />
        <PlaceholderLine height={10} width="70%" style={flex_start_style} />
        <PlaceholderLine height={40} width={35} style={styles.btnLoading} />
      </View>
    </Placeholder>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(15),
    marginTop: scaleHeight(22),
  },

  containerTop: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: scaleHeight(15),
  },

  containerItem: {
    width: scaleWidth(265),
    height: scaleHeight(264),
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
    ...AppStyles.fonts.SVN_Merge_Bold,
    color: AppStyles.colors.accent,
    fontSize: scaleWidth(14),
  },
  txtHeader: {
    ...AppStyles.fonts.SVN_Merge_Bold,
    // color: AppStyles.colors.text,
    fontSize: scaleWidth(24),
  },
});

export default index;
