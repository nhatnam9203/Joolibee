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
          itemWidth={width * 0.94}
          keyExtractor={(_) => _.id + ''}
          data={data}
          renderItem={({ item }) => <BestsellerItem item={item} />}
          enableSnap={true}
          horizontal
          inactiveSlideOpacity={0.7}
          inactiveSlideScale={1}
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
      key={item.id + ''}
      shadow={true}
      item={item}
      onPress={() => {
        navigation.navigate(ScreenName.MenuItemDetail, {
          productSku: item?.sku,
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
