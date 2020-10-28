import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Placeholder,
  PlaceholderLine,
  PlaceholderMedia,
  Fade,
} from 'rn-placeholder';
import { Text } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { JollibeeImage } from "../../../../components";
import { AppStyles } from '@theme';
import { CustomButton } from '@components';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;
const { width } = Dimensions.get('window');

const index = ({ openDetail, onCHangeScreen, data }) => {
  return (
    <View style={styles.container}>

      <View style={styles.containerTop}>
        <Text
          style={[

            AppStyles.fonts.title,
            { color: AppStyles.colors.text, fontSize: scaleWidth(32) },
          ]}>
          Tin Tức
        </Text>

        <TouchableOpacity
          onPress={onCHangeScreen}
        >
          <Text
            style={styles.txtSeeAll}>
            XEM TẤT CẢ
        </Text>
        </TouchableOpacity>
      </View>

      <Carousel
        data={data}
        renderItem={(item, index) => renderItem(item, index, openDetail)}
        sliderWidth={width}
        itemWidth={width}
        itemHeight={scaleHeight(384)}
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
  const { title, featured_image } = item || {};
  return (
    <View style={styles.wrapperItem}>
      <View
        key={index + ''}
        style={[styles.containerItem, AppStyles.styles.shadow]}>
        <JollibeeImage url={featured_image} style={styles.imgProduct} />

        <View style={styles.content}>
          <Text style={[AppStyles.fonts.medium_SVN, styles.txttitle]}>
            {title?.toUpperCase()}
          </Text>

          <Text style={[AppStyles.fonts.text, styles.txtContent]}>
            Năm nay, Jollibee Việt Nam đưa vào vận hành nhà máy mới tại Long An
            và nhận được...
          </Text>
        </View>

        <CustomButton
          onPress={onPress}
          label={'XEM THÊM'}
          width={134}
          height={43}
          bgColor={AppStyles.colors.button}
          style={styles.btn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: AppStyles.colors.cyan,
    top: -50,
    alignItems: 'center',
    paddingHorizontal: scaleWidth(15),
    paddingVertical: scaleHeight(20),
  },

  containerTop: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: scaleHeight(30),
  },

  wrapperItem: {
    width: '100%',
    height: scaleHeight(390),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  containerItem: {
    width: '100%',
    height: scaleHeight(344),
    alignItems: 'center',
    backgroundColor: AppStyles.colors.white,
    borderRadius: scaleWidth(10),
    padding: scaleWidth(10),
  },

  content: {
    paddingHorizontal: scaleWidth(10),
    top: scaleHeight(-20),
  },

  txttitle: {
    color: AppStyles.colors.text,
    fontSize: scaleWidth(16),
    textAlign: 'center',
  },
  txtContent: {
    color: AppStyles.colors.text,
    fontSize: scaleWidth(14),
    marginTop: scaleHeight(8),
  },
  imgProduct: {
    width: scaleWidth(281),
    height: scaleHeight(174),
    resizeMode: 'stretch',
    top: scaleHeight(-40),
    zIndex: 100000,
  },
  btn: {
    alignSelf: 'flex-start',
    marginTop: scaleHeight(10),
  },
  txtSeeAll: {
    textDecorationLine: 'underline',
    ...AppStyles.fonts.bold,
    fontSize: 14,
  },
});

export default index;
