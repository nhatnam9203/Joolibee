import { useChangeLanguage } from '@hooks';
import {
  AppScrollViewIOSBounceColorsWrapper,
  SinglePageLayout,
} from '@layouts';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import { CustomImageBackground } from '@components';
import { scale } from '@utils';
import { translate } from '@localize';
import React from 'react';
import { Dimensions, Image, StyleSheet, View } from 'react-native';
import { TopBarLeft, TopBarRight, CardView } from '../components';
import { Banners, Bestseller, Tabs, News } from './pages';
const { width, height } = Dimensions.get('window');
const { scaleWidth, scaleHeight } = scale;

export default function Index() {
  const navigation = useNavigation();
  const [language] = useChangeLanguage();

  React.useEffect(() => {
    navigation.setOptions({
      //   headerTitle: translate('txtMenu'),
      headerRight: () => <TopBarRight />,
      headerLeft: () => <TopBarLeft />,
    });
  }, [language, navigation]);

  return (
    <CustomImageBackground
      source={images.watermark_background_2}
      style={styles.customImageBackground}>
      <AppScrollViewIOSBounceColorsWrapper
        style={styles.container}
        topBounceColor={AppStyles.colors.accent}
        bottomBounceColor="transparent">
        <SinglePageLayout>
          <Banners />

          {/* --------- Background Yellow ------------ */}
          <View style={styles.wrapperContainerLayoutYellow}>
            <View style={styles.topContainer} />

            <View style={styles.containerLayoutYellow}>
              <Image
                source={images.jollibee_background_new_home}
                style={styles.imgLayoutYellow}
              />
              {/* --------- Tabs Menu ------------ */}
              <Tabs />
              {/* --------- Bestseller list ------------ */}
              <Bestseller />
            </View>
          </View>

          {/* --------- </Background Yellow>------------ */}

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

            <News />
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
    height: scaleHeight(187),
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
    flex: 0,
    backgroundColor: AppStyles.colors.accent,
  },
  containerLayoutYellow: {
    flex: 0,
    overflow: 'hidden',
    height: height - 187,
  },
  imgLayoutYellow: { width, position: 'absolute' },
  iconStyle: { width: scaleWidth(78), height: scaleHeight(71) },
  titleStyle: { fontSize: 18, textAlign: 'center' },
});
