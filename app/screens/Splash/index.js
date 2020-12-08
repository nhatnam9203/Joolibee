import { CodePushStatus, useCodePushUpdate } from '@hooks';
import { translate } from '@localize';
import { app } from '@slices';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import codePush from 'react-native-code-push';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';

const { scaleWidth, scaleHeight } = scale;

const Splash: () => React$Node = () => {
  const dispatch = useDispatch();

  const [processing, setProcessing] = React.useState({
    code: CodePushStatus.PROCESSING,
    message: 'init',
  });

  const codePushDownloadProgress = (
    { receivedBytes, totalBytes },
    isMounted = false,
  ) => {
    setProcessing(
      Object.assign(
        {},
        processing,
        {
          progress: Math.round((receivedBytes / totalBytes).toFixed(2) * 100),
        },
        isMounted,
      ),
    );
  };

  const codePushProcessComplete = (values, isMounted = false) => {
    Logger.debug(values, `CodePush Update ${isMounted}`);
    if (isMounted) {
      setProcessing(values);
    }
  };

  const codePushStatusChange = (status, isMounted = false) => {
    switch (status) {
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // self.setState({ modalVisible: true });
        codePushProcessComplete(
          {
            code: CodePushStatus.SUCCESS,
            message: 'update-installed',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.SYNC_IN_PROGRESS:
        // self.setState({ modalVisible: true });
        codePushProcessComplete(
          {
            code: CodePushStatus.PROCESSING,
            message: 'sync-in-progress',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        codePushProcessComplete(
          {
            code: CodePushStatus.PROCESSING,
            message: 'check-for-update',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        codePushProcessComplete(
          {
            code: CodePushStatus.PROCESSING,
            message: 'download-package',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        codePushProcessComplete(
          {
            code: CodePushStatus.PROCESSING,
            message: 'installing-update',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        codePushProcessComplete(
          {
            code: CodePushStatus.PROCESSING,
            message: 'awaiting-user-action',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        codePushProcessComplete(
          {
            code: CodePushStatus.SUCCESS,
            message: 'update-ignored',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        codePushProcessComplete(
          {
            code: CodePushStatus.SUCCESS,
            message: 'update-to-date',
          },
          isMounted,
        );
        break;

      default:
        codePushProcessComplete(
          {
            code: CodePushStatus.SUCCESS,
            message: status + '',
          },
          isMounted,
        );
        break;
    }
  };

  React.useEffect(() => {
    // update code push success
    if (processing?.code !== CodePushStatus.PROCESSING) {
      dispatch(app.loadingSuccess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

  React.useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    try {
      codePush
        .checkForUpdate()
        .then((update) => {
          if (update) {
            if (update.isFirstRun && update.description) {
              // Display a "what's new?" modal
              codePushProcessComplete(
                {
                  code: CodePushStatus.PROCESSING,
                  message: update.description,
                },
                isMounted,
              );
            } else if (update.failedInstall) {
              /* đã update */
              codePushProcessComplete(
                {
                  code: CodePushStatus.SUCCESS,
                  message: 'update-rollbacks',
                },
                isMounted,
              );
            } else {
              let options = {
                updateDialog: true,
                installMode: codePush.InstallMode.IMMEDIATE,
                mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
              };

              codePush.sync(
                options,
                (value) => codePushStatusChange(value, isMounted),
                (value) => codePushDownloadProgress(value, isMounted),
              );
            }
          } else {
            codePushProcessComplete(
              {
                code: CodePushStatus.SUCCESS,
                message: 'no-updated',
              },
              isMounted,
            );
          }
        })
        .catch((err) => {
          codePushProcessComplete(
            {
              code: CodePushStatus.ERROR,
              message: 'error',
              err,
            },
            isMounted,
          );
        });
    } catch (err) {
      codePushProcessComplete(
        {
          code: CodePushStatus.ERROR,
          message: 'error',
          err,
        },
        isMounted,
      );
    }

    return () => {
      isMounted = false;
    }; // use effect cleanup to set flag false, if unmounted

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
