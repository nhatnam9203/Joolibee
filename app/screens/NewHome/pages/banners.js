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

const Banners = ({
  openDetail,
  onCHangeScreen,
  data,
  loading,
  height = scaleHeight(336),
}) => {
  return (
    <View style={[styles.container, { height: height }]}>
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
        autoplayInterval={30000}
        autoplayDelay={1500}
        removeClippedSubviews={false}
        useScrollView={true}
        lockScrollWhileSnapping={true}
        horizontal
        loopClonesPerSide={3}
      />
    </View>
  );
};

const renderItem = (item, index, onPress) => {
  return (
    <TouchableOpacity style={styles.content}>
      <Image
        source={{ uri: item?.item?.image?.url }}
        style={styles.containerItem}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10000,
    top: 0,
    shadowOffset: {
      width: 6,
      height: 10,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },

  content: {
    width: '100%',
    height: '100%',
  },

  containerItem: {
    resizeMode: 'contain',
    flex: 1,
  },
});

export default Banners;
