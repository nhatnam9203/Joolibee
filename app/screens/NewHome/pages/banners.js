import { scale } from '@utils';
import { Loading } from '@components';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { JollibeeImage } from '../../components';
import Carousel from 'react-native-snap-carousel';
const { scaleHeight } = scale;
const { width } = Dimensions.get('window');

const Banners = ({ data, loading, height = scaleHeight(336) }) => {
  return (
    <View style={[styles.container, { height: height }]}>
      <Carousel
        keyExtractor={(item, index) => index + ''}
        data={!loading ? data : [1, 2, 3]}
        renderItem={(item) =>
          loading ? renderLoading(loading) : renderItem(item)
        }
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

const renderItem = (item) => {
  return (
    <TouchableOpacity style={styles.content}>
      <JollibeeImage
        url={item?.item?.image?.url}
        style={styles.containerItem}
      />
    </TouchableOpacity>
  );
};

const renderLoading = (loading) => {
  return (
    <View style={styles.contentLoading}>
      <Loading
        isLoading={loading}
        transparent={true}
        imageSize={'92%'}
        // spinKit={true}
      />
    </View>
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
  contentLoading: {
    width: '90%',
    height: '80%',
    alignSelf: 'center',
  },
});

export default Banners;
