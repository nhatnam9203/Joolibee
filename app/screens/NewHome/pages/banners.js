import { scale } from '@utils';
import { Loading } from '@components';
import React from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Easing,
} from 'react-native';
import { JollibeeImage } from '../../components';
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../../ScreenName';
import { images } from '@theme';
import { scrollInterpolator, animatedStyles } from './animations';

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
          inactiveSlideOpacity={0.5}
          inactiveSlideScale={0.5}
          // containerCustomStyle={{ overflow: 'visible' }}
          // contentContainerCustomStyle={{ overflow: 'visible' }}
          enableSnap={true}
          loop={true}
          autoplay={true}
          autoplayInterval={3500} // Delay in ms until navigating to the next item
          autoplayDelay={500}
          removeClippedSubviews={true}
          lockScrollWhileSnapping={true}
          horizontal
          loopClonesPerSide={3}
          // inactiveSlideShift={0}
          // enableMomentum={true}
          activeSlideAlignment={'center'}
          // scrollInterpolator={scrollInterpolator}
          // slideInterpolatedStyle={animatedStyles}
          // useScrollView={true}
          // activeAnimationType="decay"
          // activeAnimationOptions={{
          //   duration: 1500,
          // }}
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
        // defaultSource={images.test}
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
