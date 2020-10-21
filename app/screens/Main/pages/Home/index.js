import React from 'react';
import { StyleSheet, View, Image, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TopBarScreenLayout, SinglePageLayout } from '@layouts';
import { AppStyles, metrics, images } from '@theme';
import { CustomButton } from '@components';

import ScreenName from '../../../ScreenName';
import { scale } from '@utils';
import {
  TopBarComponent,
  PopupSelectAreaComponent,
  MenuPageName,
  PromotionPageName,
  PopupWebView,
} from '../../../components';
import {
  ProductPromotionList,
  BestSellerList,
  NewsList,
  AboutJollibee,
  ServiceList,
} from './widget';

const { scaleWidth, scaleHeight } = scale;

const HomePage = () => {
  const [isVisible, setVisiblePopup] = React.useState(false);
  const [visible_detail, showDetail] = React.useState(false);
  const navigation = useNavigation();
  const onTogglePopup = () => setVisiblePopup(true);
  const onToggleDetail = () => showDetail(!visible_detail);

  const onCHangeScreen = (screen) => () => {
    navigation.navigate(screen);
  };

  React.useEffect(() => {
    setVisiblePopup(true);
  }, []);

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
            onPress={onCHangeScreen(MenuPageName)}
            label={'XEM THỰC ĐƠN'}
            width={'42%'}
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
              onPress={onCHangeScreen(PromotionPageName)}
              label={'KHUYẾN MÃI'}
              width={'42%'}
              height={43}
              bgColor={AppStyles.colors.button}
              styleText={{ fontSize: 14 }}
            />
          </View>
        </ImageBackground>

        <ProductPromotionList />

        <BestSellerList openMenu={onCHangeScreen(MenuPageName)} />

        <NewsList
          openDetail={onToggleDetail}
          onCHangeScreen={onCHangeScreen(ScreenName.News)}
        />

        <ServiceList openDetail={onToggleDetail} />

        <AboutJollibee openDetail={onToggleDetail} />
      </SinglePageLayout>

      <PopupSelectAreaComponent visible={isVisible} onToggle={onTogglePopup} />

      <PopupWebView visible={visible_detail} onToggle={onToggleDetail} />
    </TopBarScreenLayout>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: AppStyles.colors.accent },
  containerTop: {
    paddingHorizontal: metrics.padding,
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
    height: scaleHeight(350),
    justifyContent: 'center',
  },

  jollibeeHome: {
    position: 'absolute',
    top: 0,
    right: -scaleWidth(50),
    width: scaleWidth(270),
    height: scaleHeight(280),
    resizeMode: 'contain',
  },
});

export default HomePage;
