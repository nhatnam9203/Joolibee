import { scale } from '@utils';
import { Loading } from '@components';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { JollibeeImage } from '../../components';
import Carousel from 'react-native-snap-carousel';
const { scaleHeight } = scale;
const { width } = Dimensions.get('window');

const Banners = ({ data, loading, height = scaleHeight(336) }) => {
  if (loading) {
    return <BannerItemLoading height={height} />;
  }

  if (data) {
    return (
      <View style={[styles.container, { height: height }]}>
        <Carousel
          keyExtractor={(item, index) => index + ''}
          data={data}
          renderItem={({ item }) => <BannerItem item={item} />}
          sliderWidth={width}
          itemWidth={width}
          hasParallaxImages={true}
          enableSnap={true}
          loop={true}
          autoplay={true}
          autoplayInterval={30000}
          autoplayDelay={1500}
          removeClippedSubviews={false}
          // useScrollView={true}
          lockScrollWhileSnapping={true}
          horizontal
          loopClonesPerSide={3}
        />
      </View>
    );
  }

  return <View style={[styles.container, { height: height }]} />;
};

const BannerItem = ({ item }) => {
  return (
    <TouchableOpacity style={styles.content}>
      <JollibeeImage url={item?.image?.url} style={styles.containerItem} />
    </TouchableOpacity>
  );
};

const BannerItemLoading = ({ height }) => {
  return (
    <View style={[styles.container, { height: height, width: width }]}>
      <View style={styles.content}>
        <Loading
          isLoading={true}
          transparent={true}
          imageSize={'60%'}
          // spinKit={true}
        />
      </View>
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
});

export default Banners;
