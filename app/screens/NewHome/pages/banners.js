import { scale } from '@utils';
import { Loading } from '@components';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { JollibeeImage } from '../../components';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../../ScreenName';

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
          renderItem={({ item }) => <BannerItem item={item} height={height} />}
          sliderWidth={width}
          itemWidth={width}
          hasParallaxImages={true}
          enableSnap={true}
          loop={true}
          autoplay={true}
          autoplayInterval={2000}
          autoplayDelay={1000}
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

const BannerItem = ({ item, height }) => {
  // const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.content}
      onPress={() => {
        // navigation.navigate(ScreenName.MenuItemDetail, {
        //   product_id: item?.product_id,
        // });
      }}>
      <JollibeeImage
        url={item?.image_url}
        height={height}
        width={width}
        resizeMode="contain"
      />
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
});

export default Banners;
