import { CustomButton } from '@components';
import {
  AppScrollViewIOSBounceColorsWrapper,
  SinglePageLayout,
  TopBarScreenLayout,
} from '@layouts';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { cart } from '@slices';
import {
  MenuPageName,
  PopupSelectAreaComponent,
  PopupWebView,
  PromotionPageName,
  TopBarComponent,
} from '../../../components';
import ScreenName from '../../../ScreenName';
import {
  AboutJollibee,
  BestSellerList,
  NewsList,
  ProductPromotionList,
  ServiceList,
} from './widget';
import { useQuery } from '@apollo/client';
import { query } from '@graphql';

const { scaleWidth, scaleHeight } = scale;

const HomePage = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cart_id = useSelector((state) => state.cart?.cart_id);
  const [isVisible, setVisiblePopup] = React.useState(false);
  const [visible_detail, showDetail] = React.useState(false);
  const { data, error, loading, refetch } = useQuery(query.HOME_SCREEN);


  const _data = data ? data?.homeScreen : {}

  const onTogglePopup = () => setVisiblePopup(true);
  const onToggleDetail = () => showDetail(!visible_detail);

  const onCHangeScreen = (screen) => () => {
    let params = { data: _data.news ? _data.news : [], loading, refetch };
    navigation.navigate(screen, params);
  };



  React.useEffect(() => {
    if (!cart_id) dispatch(cart.createEmptyCart());
    setTimeout(() => {
      setVisiblePopup(true);
    }, 1000);
  }, []);



  return (
    <AppScrollViewIOSBounceColorsWrapper
      style={styles.container}
      topBounceColor={AppStyles.colors.accent}
      bottomBounceColor={AppStyles.colors.button}

    >
      <TopBarScreenLayout
        style={{ backgroundColor: 'transparent' }}
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
                margin: scaleHeight(10),
              }}
            />

            <Image source={images.jollibee_home} style={styles.jollibeeHome} />

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
          </View>

          <ProductPromotionList
            loading={loading}
            data={_data.promotions ? _data.promotions : []}
          />

          <BestSellerList
            loading={loading}
            data={_data.best_sellers ? _data.best_sellers : []}
            openMenu={onCHangeScreen(MenuPageName)} />

          <NewsList
            loading={loading}
            data={_data.news ? _data.news : []}
            openDetail={onToggleDetail}
            onCHangeScreen={onCHangeScreen(ScreenName.News)}
          />

          <ServiceList openDetail={onToggleDetail} />

          <AboutJollibee openDetail={onToggleDetail} />
        </SinglePageLayout>

        <PopupSelectAreaComponent
          visible={isVisible}
          onToggle={onTogglePopup}
        />

        <PopupWebView visible={visible_detail} onToggle={onToggleDetail} />
      </TopBarScreenLayout>
    </AppScrollViewIOSBounceColorsWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerTop: {
    backgroundColor: AppStyles.colors.accent,
    flex: 0,
  },
  txtTitle: {
    fontSize: scaleWidth(24),
    width: scaleWidth(200),
    color: AppStyles.colors.white,
    marginHorizontal: 10,
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
