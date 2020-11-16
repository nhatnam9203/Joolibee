import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import Carousel from 'react-native-snap-carousel';
import { metrics } from '@theme';
import { OrderNewItem } from '../../components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get('window');

const Bestseller = ({ openDetail, onCHangeScreen, data, loading }) => {
  const onRenderItem = (item) => {
    if (typeof renderItem === 'function') {
      return renderItem(item, loading || !data);
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        sliderWidth={width}
        itemWidth={width * 0.9}
        keyExtractor={(_, index) => index + ''}
        data={loading ? [1, 2, 3] : data}
        renderItem={onRenderItem}
        hasParallaxImages={true}
        enableSnap={true}
        loop={true}
        useScrollView={true}
        lockScrollWhileSnapping={true}
        horizontal
        loopClonesPerSide={3}
        removeClippedSubviews={false}
        inactiveSlideOpacity={0.8}
        inactiveSlideScale={0.95}
      />
    </View>
  );
};

const renderItem = ({ item, index }, loading) => {
  return (
    <OrderNewItem
      key={index + ''}
      shadow={true}
      loading={loading}
      item={item}
      onPress={() => {
        // navigation.navigate(ScreenName.MenuItemDetail, { productItem: item });
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
});

export default Bestseller;
