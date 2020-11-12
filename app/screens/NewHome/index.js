import { useChangeLanguage } from '@hooks';
import {
  //   AppScrollViewIOSBounceColorsWrapper,
  SinglePageLayout,
} from '@layouts';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { Dimensions, ImageBackground, StyleSheet, View } from 'react-native';
import { TopBarLeft, TopBarRight, CardView } from '../components';
import { Banners, Bestseller, Tabs } from './pages';
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
    <SinglePageLayout backgroundColor={AppStyles.colors.accent}>
      <View style={styles.topContainer} />
      <Banners />
      <ImageBackground
        source={images.jollibee_background_new_home}
        style={{ width, height }}>
        <Tabs />
        <Bestseller />
        <ImageBackground
          source={images.watermark_background_2}
          style={{
            width,
            height,
            marginTop: scaleHeight(32),
          }}>
          <CardView
            onPress={() => {}}
            borderRadius={16}
            width={scaleWidth(181)}
            height={scaleHeight(170)}
            url={images.jollibee_birthday_order}
            title={'ĐẶT TIỆC SINH NHẬT'}
            bgColor={AppStyles.colors.orange}
            styleIcon={{ width: scaleWidth(78), height: scaleHeight(71) }}
            styleTitle={{ fontSize: 18, textAlign: 'center' }}
          />

          <CardView
            onPress={() => {}}
            borderRadius={16}
            width={scaleWidth(181)}
            height={scaleHeight(170)}
            url={images.jollibee_big_order}
            title={'ĐƠN HÀNG LỚN'}
            bgColor={AppStyles.colors.dark_aqua}
            styleIcon={{ width: scaleWidth(78), height: scaleHeight(71) }}
            styleTitle={{ fontSize: 18, textAlign: 'center' }}
          />
        </ImageBackground>
      </ImageBackground>
    </SinglePageLayout>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    width,
    height: scaleHeight(187),
  },
  container: {
    backgroundColor: AppStyles.colors.accent,
    alignItems: 'center',
  },
});
