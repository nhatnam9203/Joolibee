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
          // inactiveSlideOpacity={0.8}
          // inactiveSlideScale={1}
          containerCustomStyle={{ overflow: 'visible' }}
          contentContainerCustomStyle={{ overflow: 'visible' }}
          enableSnap={true}
          loop={true}
          autoplay={true}
          autoplayInterval={3000} // Delay in ms until navigating to the next item
          autoplayDelay={500}
          // removeClippedSubviews={true}
          lockScrollWhileSnapping={true}
          horizontal
          loopClonesPerSide={3}
          inactiveSlideShift={0}
          // activeSlideAlignment={'center'}
          // scrollInterpolator={scrollInterpolator}
          // slideInterpolatedStyle={animatedStyles}
          // useScrollView={true}
          activeAnimationType="timing"
          // enableMomentum={true}
          activeSlideAlignment={'center'}
          // activeAnimationOptions={{
          //   duration: 5000,
          // }}
          hasParallaxImages={true}
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
        width={width}
        height={height}
        // defaultSource={images.test}
        resizeMode="contain"
        // style={{ backgroundColor: 'green' }}
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
    zIndex: 100,
    top: 0,
    // shadowOffset: {
    //   width: 6,
    //   height: 10,
    // },
    // shadowOpacity: 0.4,
    // shadowRadius: 3,
    // backgroundColor: 'red',
  },

  content: {
    width: '100%',
    height: '100%',
  },
});

export default Banners;
