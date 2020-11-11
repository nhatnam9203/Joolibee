import React from 'react';
import { ImageBackground, StyleSheet, View, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
import {
  //   AppScrollViewIOSBounceColorsWrapper,
  SinglePageLayout,
  TopBarScreenLayout,
} from '@layouts';
import { TopBarComponent } from '../components';
import { Tabs, Banners, Bestseller } from './pages';
import { useNavigation } from '@react-navigation/native';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
const { scaleWidth, scaleHeight } = scale;

export default function Index() {
  return (
    <TopBarScreenLayout style={styles.container} topBar={<TopBarComponent />}>
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
    </TopBarScreenLayout>
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
