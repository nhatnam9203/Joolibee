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
import { translate } from '@localize';
import { NewsItem } from '../../components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get('window');

const index = ({ openDetail, onCHangeScreen, data, loading }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text style={styles.txtHeader}>{translate('txtLastNews')}</Text>

        <TouchableOpacity
          style={{ flexDirection: 'row' }}
          onPress={onCHangeScreen}>
          <Text style={styles.txtSeeAll}>
            {translate('txtViewAll').toUpperCase()}
          </Text>
          <Image source={images.icons.ic_forward_red} />
        </TouchableOpacity>
      </View>

      <Carousel
        keyExtractor={(item, index) => index + ''}
        data={loading ? [1, 2, 3] : data}
        renderItem={(item) =>
          loading ? (
            renderItemLoading()
          ) : (
            <NewsItem item={item?.item} onPress={openDetail} />
          )
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

const renderItemLoading = () => {
  const flex_start_style = { alignSelf: 'flex-start' };
  return (
    <Placeholder Animation={Fade}>
      <View style={styles.containerLoading}>
        <PlaceholderMedia style={styles.imgLoading} />
        <View style={{ paddingHorizontal: 10 }}>
          <PlaceholderLine height={13} style={flex_start_style} />
          <PlaceholderLine height={13} style={flex_start_style} />
          <PlaceholderLine height={10} width="70%" style={flex_start_style} />
        </View>
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
  imgLoading: {
    width: '100%',
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
  containerLoading: {
    backgroundColor: AppStyles.colors.white,
    borderRadius: 16,
    elevation: 10,
    overflow: 'hidden',
    width: scaleWidth(265),
    height: scaleHeight(264),
  },
});

export default index;
