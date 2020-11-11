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
import { TopBarLeft, TopBarRight } from '../components';
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
    <SinglePageLayout>
      <View style={styles.topContainer} />
      <Banners />
      <ImageBackground
        source={images.jollibee_background_new_home}
        style={{ width, height }}>
        <Tabs />
        <Bestseller />
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
