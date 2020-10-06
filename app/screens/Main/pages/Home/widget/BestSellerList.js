import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Text } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

import { AppStyles, metrics, images } from '@theme';
import { CustomButton } from '@components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get('window');
const data = [1, 2, 3, 4, 5];

const index = () => {
  const refScrollView = React.createRef(null);
  let page = 0;

  // React.useEffect(() => {
  //     const looping = setInterval(() => {
  //         if (refScrollView) {
  //             page = page <= data.length ? page + 1 : 0;
  //             refScrollView.current.scrollTo({ x: (scaleWidth(165) * page), y: 0, animated: true });
  //         }
  //     }, 2000);
  //     return () => clearInterval(looping)
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text
          style={[
            AppStyles.fonts.title,
            { color: AppStyles.colors.text, fontSize: scaleWidth(32) },
          ]}>
          Bán Chạy
        </Text>

        <Text
          style={[
            AppStyles.fonts.medium,
            styles.txtMenu,
            { color: AppStyles.colors.text },
          ]}>
          XEM THỰC ĐƠN
        </Text>
      </View>

      {/* <ScrollView
                ref={refScrollView}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center' }}
                horizontal

            >
                {[1, 2, 3, 4, 5].map(renderItem)}
            </ScrollView> */}

      <View
        style={{
          position: 'absolute',
          top: scaleHeight(110),
        }}>
        <Carousel
          data={data}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={scaleWidth(180)}
          itemHeight={scaleHeight(218)}
          inactiveSlideScale={0.9}
          inactiveSlideOpacity={1}
          firstItem={0}
          autoplay
          autoplayInterval={5000}
          loop
          loopClonesPerSide={2}
        />
      </View>
    </View>
  );
};

const renderItem = (item, index) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => alert('ads')}
      key={index + ''}
      style={[styles.containerItem, AppStyles.styles.shadow]}>
      <Image source={images['jollibee_combo1']} style={styles.imgProduct} />
      <Text
        numberOfLines={2}
        style={[
          AppStyles.fonts.medium_SVN,
          { color: AppStyles.colors.text, fontSize: scaleWidth(13) },
        ]}>
        CƠM GÀ GIÒN + SÚP BÍ ĐỎ + NƯỚC NGỌT
      </Text>

      <View style={styles.price}>
        <Text style={[AppStyles.fonts.medium_SVN, styles.txtPrice]}>
          70.000 đ
        </Text>

        <Text style={[AppStyles.fonts.mini]}>(+5 điểm)</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleHeight(381),
    backgroundColor: AppStyles.colors.orange,
    // top: scaleHeight(-40),
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
  },

  containerTop: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: scaleHeight(30),
  },

  containerItem: {
    width: scaleWidth(180),
    height: scaleHeight(218),
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.white,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
  },
  txtPrice: {
    color: AppStyles.colors.accent,
    fontSize: scaleWidth(16),
  },
  price: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  txtMenu: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
  imgProduct: {
    width: scaleWidth(124),
    height: scaleHeight(124),
    resizeMode: 'contain',
  },
});

export default index;
