import { useQuery } from '@apollo/client';
import { CustomImageBackground } from '@components';
import { GQL } from '@graphql';
import { useChangeLanguage } from '@hooks';
import {
  AppScrollViewIOSBounceColorsWrapper,
  SinglePageLayout,
} from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { app } from '@slices';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  CardView,
  TopBarLeft,
  TopBarRight,
  PopupSelectAreaComponent,
} from '../components';
import ScreenName from '../ScreenName';
import { Banners, Bestseller, News, Tabs } from './pages';
import ProductCart from '../ProductCart';
import { RESULTS } from 'react-native-permissions';

const { width, height } = Dimensions.get('window');
const { scaleWidth, scaleHeight } = scale;

const BANNER_HEIGHT = height * 0.4;
const BANNER_PADDING = height * 0.2;
const MENU_TOP_MARGIN = height * 0.2;

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [language] = useChangeLanguage();
  const headerHeight = useHeaderHeight();

  const [isVisible, setVisiblePopup] = React.useState(false);
  const showOrderList = useSelector((state) => state.app.isShowOrderList);
  const isAllowLocations = useSelector(
    (state) => state.setting.isAllowLocations,
  );

  const { data, loading, refetch } = useQuery(GQL.HOME_SCREEN, {
    fetchPolicy: 'only-cache',
  });

  const { homeScreen } = data || {};

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => <TopBarRight />,
      headerLeft: () => <TopBarLeft />,
    });
  }, [language, navigation]);

  React.useEffect(() => {
    setTimeout(() => {
      setVisiblePopup(isAllowLocations !== RESULTS.GRANTED);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCHangeScreen = (screen) => () => {
    let params = {
      data: homeScreen.news ? homeScreen.news : [],
      loading,
      refetch,
    };
    navigation.navigate(screen, params);
  };

  return (
    <View style={styles.container}>
      <CustomImageBackground
        source={images.watermark_background_2}
        style={styles.customImageBackground}>
        <AppScrollViewIOSBounceColorsWrapper
          style={styles.content}
          topBounceColor={AppStyles.colors.accent}
          bottomBounceColor="transparent">
          <SinglePageLayout>
            {/* BANNERS */}
            <Banners
              loading={loading}
              data={homeScreen?.promotions}
              height={BANNER_HEIGHT}
            />
            {/* END BANNERS */}

            {/* ---------START TOP CONTENT  ------------ */}
            <View style={[styles.wrapperContainerLayoutYellow]}>
              <View style={[styles.topContainer, { height: BANNER_PADDING }]} />

              <View
                style={[
                  styles.containerLayoutYellow,
                  { height: height - BANNER_PADDING - headerHeight },
                ]}>
                {/* --------- Yellow Background ------------ */}
                <Image
                  source={images.jollibee_background_new_home}
                  style={styles.imgLayoutYellow}
                  resizeMethod="resize"
                />
                {/* --------- Yellow Background ------------ */}

                <View
                  style={[
                    styles.topContentView,
                    { marginTop: MENU_TOP_MARGIN },
                  ]}>
                  {/* --------- Tabs Menu ------------ */}
                  <Tabs />
                  {/* --------- Bestseller list ------------ */}
                  <Bestseller
                    loading={loading}
                    data={homeScreen?.best_sellers}
                  />
                </View>
              </View>
            </View>

            {/* ---------END TOP CONTENT  ------------ */}

            {/* --------- Background WaterMark ------------ */}
            <CustomImageBackground
              source={images.watermark_background_2}
              style={styles.waterMarkContainer}>
              {/* --------- Button birthday order ------------ */}
              <View style={styles.layoutHorizontal}>
                <CardView
                  onPress={() => {}}
                  borderRadius={16}
                  width={scaleWidth(181)}
                  height={scaleHeight(170)}
                  url={images.jollibee_birthday_order}
                  title={translate('txtBirthDayOrder')?.toUpperCase()}
                  bgColor={AppStyles.colors.orange}
                  styleIcon={styles.iconStyle}
                  styleTitle={styles.titleStyle}
                />
                {/* --------- Button big order ------------ */}
                <CardView
                  onPress={() => {}}
                  borderRadius={16}
                  width={scaleWidth(181)}
                  height={scaleHeight(170)}
                  url={images.jollibee_big_order}
                  title={translate('txtBigOrder')?.toUpperCase()}
                  bgColor={AppStyles.colors.dark_aqua}
                  styleIcon={styles.iconStyle}
                  styleTitle={styles.titleStyle}
                />
              </View>

              <News
                loading={loading}
                data={homeScreen?.news ?? []}
                onCHangeScreen={onCHangeScreen(ScreenName.News)}
              />
            </CustomImageBackground>
            {/* --------- </Background WaterMark> ------------ */}
          </SinglePageLayout>
        </AppScrollViewIOSBounceColorsWrapper>
      </CustomImageBackground>

      {/**Popup Order List Items */}
      <ProductCart
        visible={showOrderList}
        onToggle={() => dispatch(app.dismissOrderList())}
      />

      <PopupSelectAreaComponent visible={isVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    alignItems: 'center',
    flex: 1,
  },

  topContainer: {
    width,
    backgroundColor: AppStyles.colors.accent,
  },

  layoutHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  waterMarkContainer: {
    paddingVertical: scaleHeight(41),
    width,
    flex: 1,
  },

  customImageBackground: {
    width,
    flex: 1,
  },

  wrapperContainerLayoutYellow: {
    backgroundColor: AppStyles.colors.accent,
    flex: 0,
  },

  containerLayoutYellow: {
    overflow: 'hidden',
  },

  imgLayoutYellow: {
    position: 'absolute',
    resizeMode: 'stretch',
    width: '100%',
    height: '100%',
  },

  iconStyle: { width: scaleWidth(78), height: scaleHeight(71) },
  titleStyle: { fontSize: 18, textAlign: 'center' },

  topContentView: {
    flex: 1,
    paddingBottom: 20,
    justifyContent: 'space-around',
  },
});

export default HomeScreen;
