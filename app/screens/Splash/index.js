import { useStorePickup } from '@hooks';
import { app, store } from '@slices';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import codePush from 'react-native-code-push';
import { useCodePushUpdate, CodePushStatus } from '@hooks';
import { translate } from '@localize';
import { GEX } from '@graphql';

const { scaleWidth, scaleHeight } = scale;

const Splash = () => {
  const dispatch = useDispatch();

  // !!  sao no lai load lai khi chuyen trang thai, hooks lien quan
  const { checkCodePushUpdate, processing } = useCodePushUpdate();
  const getStoreJsonData = GEX.useGetStoreInfo();

  React.useEffect(() => {
    // update code push success
    if (processing?.code !== CodePushStatus.PROCESSING) {
      getStoreJsonData();

      setTimeout(() => {
        dispatch(app.loadingSuccess());
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

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
        <View style={styles.container_footer}>
          {/* Download package progress */}
          {processing?.progress > 0 && (
            <Text style={styles.textDownloadProgress}>
              {translate('txtDownloadPackage') +
                Math.min(processing?.progress, 100) +
                '%'}
            </Text>
          )}

          {/* Installing package */}
          {processing?.message === 'installing-update' && (
            <Text style={styles.textDownloadProgress}>
              {translate('txtInstallingPackage')}
            </Text>
          )}

          {/* Debug status */}
          {/* {processing && (
            <Text style={styles.textDownloadProgress}>
              {processing?.code + '----' + processing?.message}
            </Text>
          )} */}
        </View>
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
    fontStyle: 'italic',
  },
  imgBackgroundContainer: {
    flex: 1,
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
};

// let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

const SplashScreen = codePush(codePushOptions)(Splash);
export default SplashScreen;
