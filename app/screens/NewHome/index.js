import { useLazyQuery } from '@apollo/client';
import { CustomImageBackground } from '@components';
import { query } from '@graphql';
import { useChangeLanguage } from '@hooks';
import {
  AppScrollViewIOSBounceColorsWrapper,
  SinglePageLayout,
} from '@layouts';
import { translate } from '@localize';
import { useNavigation } from '@react-navigation/native';
import { useHeaderHeight } from '@react-navigation/stack';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { CardView, TopBarLeft, TopBarRight } from '../components';
import { Banners, Bestseller, News, Tabs } from './pages';

const { width, height } = Dimensions.get('window');
const { scaleWidth, scaleHeight } = scale;

const BANNER_HEIGHT = height * 0.4;
const BANNER_PADDING = height * 0.2;
const MENU_TOP_MARGIN = height * 0.2;

export default function HomeScreen() {
  const navigation = useNavigation();
  const [language] = useChangeLanguage();
  const headerHeight = useHeaderHeight();

  const [getHome, { data, loading }] = useLazyQuery(query.HOME_SCREEN, {
    // fetchPolicy: 'cache-first',
  });

  const { homeScreen } = data || {};

  React.useEffect(() => {
    getHome();
    navigation.setOptions({
      headerRight: () => <TopBarRight />,
      headerLeft: () => <TopBarLeft />,
    });
  }, [language, navigation, getHome]);

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.customImageBackground}>
      <AppScrollViewIOSBounceColorsWrapper
        style={styles.container}
        topBounceColor={AppStyles.colors.accent}
        bottomBounceColor="transparent">
        <SinglePageLayout>
          <Banners
            loading={loading}
            data={homeScreen?.promotions ? homeScreen?.promotions : []}
            height={BANNER_HEIGHT}
          />

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
                style={[styles.topContentView, { marginTop: MENU_TOP_MARGIN }]}>
                {/* --------- Tabs Menu ------------ */}
                <Tabs />
                {/* --------- Bestseller list ------------ */}
                <Bestseller
                  loading={loading}
                  data={
                    homeScreen?.best_sellers ? homeScreen?.best_sellers : []
                  }
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
              data={homeScreen?.news ? homeScreen?.news : []}
            />
          </CustomImageBackground>
          {/* --------- </Background WaterMark> ------------ */}
        </SinglePageLayout>
      </AppScrollViewIOSBounceColorsWrapper>
    </CustomImageBackground>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width,
    backgroundColor: AppStyles.colors.accent,
  },

  container: {
    alignItems: 'center',
    flex: 1,
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
