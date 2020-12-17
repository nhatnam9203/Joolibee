import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { OrderNewItem } from '../../components';
const { width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import ScreenName from '../../ScreenName';
import { OrderNewItemLoading } from '../../components';

const Bestseller = React.memo(({ data, loading }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <OrderNewItemLoading />
        </View>
      </View>
    );
  }

  if (data) {
    return (
      <View style={styles.container}>
        <Carousel
          sliderWidth={width}
          itemWidth={width * 0.86}
          keyExtractor={(_, index) => index + ''}
          data={data}
          renderItem={({ item }) => <BestsellerItem item={item} />}
          enableSnap={true}
          horizontal
          inactiveSlideOpacity={0.7}
          inactiveSlideScale={0.98}
          loop={true}
          autoplay={false}
          autoplayInterval={3000}
          autoplayDelay={1500}
          removeClippedSubviews={false}
          // useScrollView={true}
          lockScrollWhileSnapping={true}
          loopClonesPerSide={3}

        />
      </View>
    );
  }

  return <></>;
});

const BestsellerItem = React.memo(({ item }) => {
  const navigation = useNavigation();

  return (
    <OrderNewItem
      key={item?.id + ''}
      shadow={true}
      item={item}
      onPress={() => {
        navigation.navigate(ScreenName.MenuItemDetail, {
          product: item,
        });
      }}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },

  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
});

export default Bestseller;
