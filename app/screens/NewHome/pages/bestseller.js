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
  return (
    <View style={styles.container}>
      <Carousel
        keyExtractor={(item, index) => index + ''}
        data={loading ? [1, 2, 3] : data}
        renderItem={(item, index) => renderItem(item, index, openDetail)}
        sliderWidth={width}
        itemWidth={scaleWidth(345)}
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
  return (
    <OrderNewItem
      item={item}
      key={item.id + ''}
      updateQty={() => {}}
      onPress={() => {}}
      shadow={true}
    />
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
    marginVertical: scaleHeight(30),
    flex: 0,
    // alignSelf: 'flex-start',
  },

  containerItem: {
    width,
    height: scaleHeight(361),
    resizeMode: 'contain',
  },
});

export default Bestseller;
