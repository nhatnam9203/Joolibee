import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import Carousel from 'react-native-snap-carousel';
import { JollibeeImage } from "../../../../components";
import { AppStyles, images } from '@theme';
import { CustomButton } from '@components';
import { format, scale } from "@utils";
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get('window');

const index = ({ data, loading }) => {

  const renderItem = ({ item, index }) => {
    const { price_range, image } = item;
    const { minimum_price } = price_range || {};
    const _price = format.jollibeeCurrency(minimum_price?.final_price);
    return (
      <View style={styles.wrapperItem}>
        <ImageBackground
          style={styles.price}
          source={images['jollibee_price']}
          resizeMode="stretch">
          <Text
            style={[
              AppStyles.fonts.medium_SVN,
              { color: AppStyles.colors.white },
            ]}>
            {_price}
          </Text>
        </ImageBackground>

        <CustomButton
          onPress={() => alert('ads')}
          key={index + ''}
          style={styles.containerItem}>
          <JollibeeImage url={image?.url} style={styles.imageProduct} />
        </CustomButton>
      </View>
    );
  };

  const renderItemLoading = () => {
    return (
      <Placeholder
        Animation={Fade}
        style={[styles.wrapperItem]}>

        <View style={[
          styles.containerItem,
          loading && { borderColor: AppStyles.colors.disabled }
        ]}>
          <PlaceholderMedia style={styles.imageLoading} />
        </View>

      </Placeholder>
    );
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'absolute',
        }}>
        <Carousel
          data={loading ? [1, 2, 3] : data}
          renderItem={loading ? renderItemLoading : renderItem}
          keyExtractor={(_, index) => index + ''}
          sliderWidth={width}
          itemWidth={scaleWidth(175)}
          itemHeight={170}
          enableSnap={true}
          loop={true}
          autoplay={!loading}
          autoplayInterval={5000}
          autoplayDelay={3000}
          removeClippedSubviews={false}
          loopClonesPerSide={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: scaleHeight(180),
    justifyContent: 'center',
    backgroundColor: AppStyles.colors.white,
    alignItems: 'center',
    top: -80,

  },

  wrapperItem: {
    width: '100%',
    height: scaleHeight(170),
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerItem: {
    width: scaleWidth(165),
    height: scaleHeight(133),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: AppStyles.colors.accent,
    borderStyle: 'dashed',
    borderRadius: scaleWidth(10),
  },
  price: {
    position: 'absolute',
    top: scaleHeight(7),
    right: scaleWidth(-10),
    width: scaleWidth(90),
    height: scaleHeight(28),
    zIndex: 10000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageProduct: {
    width: scaleWidth(124),
    height: scaleHeight(124),
  },
  imageLoading: {
    width: '90%',
    height: '90%'
  }
});

export default index;
