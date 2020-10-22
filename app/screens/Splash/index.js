import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Text } from 'react-native-paper';
import { AppStyles, images } from '@theme';

import { app } from '@slices';
import { scale } from '@utils';
import { translate } from '@localize';
import { useCodePushUpdate } from '@hooks';
import {
  TopBarScreenLayout,
  SinglePageLayout,
  AppScrollViewIOSBounceColorsWrapper,
} from '@layouts';
const { scaleWidth, scaleHeight } = scale;

const SplashScreen = () => {
  const dispatch = useDispatch();
  const [progress] = useCodePushUpdate();

  React.useEffect(() => {
    // if (progress >= 100) {
    //   setTimeout(() => {
    //     dispatch(app.loadingSuccess());
    //   }, 1500);
    // }

    setTimeout(() => {
      dispatch(app.loadingSuccess());
    }, 3000);
  }, [progress, dispatch]);

  return (
    <AppScrollViewIOSBounceColorsWrapper
      style={styles.container}
      topBounceColor={AppStyles.colors.accent}
      bottomBounceColor="#BA0404">
      <Image source={images['bee_man']} style={styles.ic_bee_man} />

      <View style={styles.container_footer}>
        <Image
          source={images.icons['ic_text_jollibee']}
          style={styles.ic_text}
          resizeMode="center"
        />

        {progress > 0 ? (
          <Text style={styles.textDownloadProgress}>
            {Math.min(progress, 100) + '%'}
          </Text>
        ) : (
          <Text style={styles.textDownloadProgress}>
            {translate('txtWelcome')}
          </Text>
        )}
      </View>
    </AppScrollViewIOSBounceColorsWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  container_footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },

  ic_bee_man: {
    resizeMode: 'contain',
    flex: 1,
    marginBottom: scaleHeight(100),
  },

  ic_text: {
    resizeMode: 'center',
  },

  textDownloadProgress: {
    fontSize: scaleWidth(21),
    fontFamily: 'Roboto-Regular',
    color: AppStyles.colors.background,
    marginTop: scaleHeight(5),
  },
});

export default SplashScreen;
