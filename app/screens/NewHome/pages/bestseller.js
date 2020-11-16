import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { OrderNewItem } from '../../components';
const { width } = Dimensions.get('window');

const Bestseller = ({ data, loading }) => {
  const onRenderItem = (item) => {
    if (typeof renderItem === 'function') {
      return renderItem(item, loading || !data);
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        sliderWidth={width}
        itemWidth={width * 0.94}
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
        inactiveSlideOpacity={0.7}
        inactiveSlideScale={1}
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
