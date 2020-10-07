import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Dimensions, ImageBackground
} from 'react-native';
import { Text } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';

import { AppStyles, images } from '@theme';
import { CustomButton } from '@components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get('window');
const data = [
  {
    id: 1,
    title: 'ĐẶT TIỆC SINH NHẬT',
    content: 'Bạn đang tìm ý tưởng cho một buổi tiệc sinh nhật thật đặc biệt dành cho con của bạn? Hãy chọn những...',
    url: images.jollibee_bubble,
    color: AppStyles.colors.green
  },
  {
    id: 2,
    title: 'ĐƠN HÀNG LỚN',
    content: 'Bạn đang tìm ý tưởng cho một buổi tiệc sinh nhật thật đặc biệt dành cho con của bạn? Hãy chọn những...',
    url: images.jollibee_bigorder,
    color: AppStyles.colors.orange
  }
];

const index = ({ openDetail }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text
          style={[
            AppStyles.fonts.title,
            { color: AppStyles.colors.text, fontSize: scaleWidth(32) },
          ]}>
          Dịch Vụ
        </Text>
      </View>

      <Carousel
        data={data}
        renderItem={({ item, index }) => renderItem(item, index, openDetail)}
        sliderWidth={width}
        itemWidth={scaleWidth(374)}
        itemHeight={scaleHeight(227)}
        hasParallaxImages={true}
        enableSnap={true}
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
        autoplayDelay={3000}
        removeClippedSubviews={false}
        useScrollView={true}
        lockScrollWhileSnapping={true}
        loopClonesPerSide={2}
      />
    </View>
  );
};

const renderItem = (item, index, onPress) => {
  return (
    <ImageBackground
      source={images.bg_services}
      key={index + ''}
      style={[styles.containerItem, { backgroundColor: item.color }]}>

      <View style={styles.content}>
        <Text style={[AppStyles.fonts.medium_SVN, styles.txttitle]}>
          {item.title}
        </Text>

        <Text
          numberOfLines={4}
          style={[AppStyles.fonts.text, styles.txtContent]}>
          {item.content}
        </Text>
        <CustomButton
          onPress={onPress}
          label={'XEM THÊM'}
          width={134}
          height={43}
          bgColor={AppStyles.colors.button}
          style={styles.btn}
        />
      </View>

      <View style={styles.content}>
        <Image
          source={item.url}
          style={styles.imgProduct}
        />
      </View>


    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F5F1E6',
    alignItems: 'center',
    paddingHorizontal: scaleWidth(10),
    paddingVertical: scaleHeight(30),
  },

  containerTop: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: scaleHeight(20),
  },

  containerItem: {
    width: scaleWidth(374),
    height: scaleHeight(227),
    borderRadius: scaleWidth(10),
    padding: scaleWidth(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...AppStyles.styles.shadow
  },

  content: {
    width: '50%',
  },

  txttitle: {
    color: AppStyles.colors.white,
    fontSize: scaleWidth(16),
    fontWeight: 'bold'
  },

  txtContent: {
    color: AppStyles.colors.white,
    fontSize: scaleWidth(14),
  },

  imgProduct: {
    width: scaleWidth(182),
    height: scaleHeight(200)
  },

  btn: {
    alignSelf: 'flex-start',
    marginTop: scaleHeight(10),
  },
});

export default index;
