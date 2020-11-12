import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import Carousel from 'react-native-snap-carousel';
import { images, AppStyles } from '@theme';
import { scale } from '@utils';
const { scaleHeight } = scale;
const { width } = Dimensions.get('window');

const Banners = ({ openDetail, onCHangeScreen, data, loading }) => {
  return (
    <View style={styles.container}>
      <Carousel
        keyExtractor={(item, index) => index + ''}
        data={!loading ? data : [1, 2, 3]}
        renderItem={(item, index) => renderItem(item, index, openDetail)}
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
  return (
    <TouchableOpacity>
      <Image
        source={{ uri: item?.item?.image?.url }}
        style={styles.containerItem}
      />
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
    position: 'absolute',
    zIndex: 10000,
    // paddingTop: metrics.padding,
    top: 0,
  },

  containerItem: {
    width,
    height: scaleHeight(361),
    resizeMode: 'contain',
    shadowColor: '#000',
    shadowOffset: {
      width: 14,
      height: 10,
    },
    shadowOpacity: 0.7,
    shadowRadius: 12,
  },
});

export default Banners;
