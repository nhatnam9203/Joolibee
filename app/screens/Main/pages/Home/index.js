import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import { Text } from 'react-native-paper';
import { TopBarScreenLayout, SinglePageLayout } from '@layouts';
import { AppStyles, metrics, images } from '@theme';
import { CustomButton } from '@components';
import { scale } from '@utils';
import { TopBarComponent, PopupSelectAreaComponent } from '../../../components';
import { ProductPromotionList, BestSellerList, NewsList, AboutJollibee, ServiceList } from './widget';
const { scaleWidth, scaleHeight } = scale;
const HomePage = () => {
  const [isVisible, setVisiblePopup] = React.useState(true);

  const onTogglePopup = () => setVisiblePopup(false);

  return (
    <TopBarScreenLayout
      style={{ backgroundColor: AppStyles.colors.accent }}
      topBar={<TopBarComponent />}>
      <SinglePageLayout>
        <View style={styles.containerTop}>
          <Text style={[AppStyles.fonts.title, styles.txtTitle]}>
            Đặt món ngay! giao tận nơi hoặc lấy tại cửa hàng
          </Text>

          <CustomButton
            // onPress={onToggle}
            label={'XEM THỰC ĐƠN'}
            width={141}
            height={43}
            bgColor={AppStyles.colors.button}
            styleText={{ fontSize: scaleWidth(14) }}
            style={{
              marginVertical: scaleHeight(10),
            }}
          />

          <Image source={images.jollibee_home} style={styles.jollibeeHome} />
        </View>

        <ImageBackground
          source={images.layout_white_home}
          style={styles.layoutPromotion}>
          <View
            style={{
              paddingHorizontal: scaleWidth(10),
              paddingTop: scaleHeight(40),
            }}>
            <Text style={[AppStyles.fonts.title, styles.txtPromotion]}>
              Nhận khuyến mãi mỗi ngày tại Jollibee
            </Text>

            <CustomButton
              // onPress={onToggle}
              label={'KHUYẾN MÃI'}
              width={134}
              height={43}
              bgColor={AppStyles.colors.button}
              styleText={{ fontSize: scaleWidth(14) }}
            />
          </View>
        </ImageBackground>

        <ProductPromotionList />

        <BestSellerList />

        <NewsList />

        <ServiceList />

        <AboutJollibee />
        
      </SinglePageLayout>
      <PopupSelectAreaComponent visible={isVisible} onToggle={onTogglePopup} />
    </TopBarScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: AppStyles.colors.accent },
  containerTop: {
    paddingHorizontal: metrics.padding,
    paddingTop: metrics.padding,
  },
  txtTitle: {
    fontSize: scaleWidth(24),
    width: scaleWidth(200),
    color: AppStyles.colors.white,
  },
  txtPromotion: {
    fontSize: scaleWidth(24),
    width: scaleWidth(250),
    color: '#1B1B1B',
    paddingBottom: scaleHeight(20),
  },
  layoutPromotion: {
    width: '100%',
    height: scaleHeight(250),
    justifyContent: 'center',
  },

  jollibeeHome: {
    position: 'absolute',
    top: scaleHeight(5),
    right: -scaleWidth(50),
    width: scaleWidth(256),
    height: scaleHeight(238),
    resizeMode: 'stretch',
  },
});

export default HomePage;
