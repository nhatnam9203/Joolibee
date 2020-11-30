import { useStorePickup } from '@hooks';
import { app, store } from '@slices';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import codePush from 'react-native-code-push';
import { useCodePushUpdate } from '@hooks';

const { scaleWidth, scaleHeight } = scale;

const Splash = () => {
  const dispatch = useDispatch();
  const { checkCodePushUpdate, processing } = useCodePushUpdate();

  // !! check version file store chỗ này, nếu có thay đổi cập nhật ở dây luôn
  const [cities, districts, initStores] = useStorePickup();

  React.useEffect(() => {
    if (processing?.code) {
      dispatch(app.loadingSuccess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

  React.useEffect(() => {
    dispatch(store.setStorePickup({ stores: initStores, cities, districts }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  React.useEffect(() => {
    checkCodePushUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={images.watermark_background_transparent}
        style={styles.imgBackgroundContainer}
        resizeMode="stretch">
        <Image source={images.loading_welcome} style={styles.ic_bee_man} />
        <Image
          source={images.icons.ic_text_jollibee}
          style={styles.ic_text}
          resizeMode="center"
        />
        {/* <View style={styles.container_footer}>
          {progress > 0 ? (
            <Text style={styles.textDownloadProgress}>
              {Math.min(progress, 100) + '%'}
            </Text>
          ) : (
            <></>
          )}
        </View> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppStyles.colors.accent,
  },

  container_footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },

  ic_bee_man: {
    resizeMode: 'contain',
    flex: 0,
    width: 200,
    height: 200,
    marginBottom: scaleHeight(25),
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
  imgBackgroundContainer: {
    flex: 1,
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.MANUAL,
  installMode: codePush.InstallMode.IMMEDIATE,
};

// let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

const SplashScreen = codePush(codePushOptions)(Splash);
export default SplashScreen;
