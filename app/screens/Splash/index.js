import { useCodePushUpdate } from '@hooks';
import { translate } from '@localize';
import { app } from '@slices';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import codePush from 'react-native-code-push';
import { Text } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { CustomImageBackground } from '@components';

const { scaleWidth, scaleHeight } = scale;

export const CodePushStatus = {
  INIT: 0,
  FINISH: 1,
  PROCESSING: 2,
  CHECK_UPDATE: 3,
  DOWNLOAD_PACKAGE: 4,
  INSTALL_UPDATE: 5,
  ERROR: -1,
  FAILED: -2,
  INSTALL_FAILED: -3,
};

const Splash: () => React$Node = () => {
  const dispatch = useDispatch();

  const [processing, setProcessing] = React.useState({
    code: CodePushStatus.INIT,
    message: 'init',
    progress: 0,
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
          code: CodePushStatus.DOWNLOAD_PACKAGE,
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
            code: CodePushStatus.FINISH,
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
            code: CodePushStatus.CHECK_UPDATE,
            message: 'check-for-update',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        codePushProcessComplete(
          {
            code: CodePushStatus.DOWNLOAD_PACKAGE,
            message: 'download-package',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        codePushProcessComplete(
          {
            code: CodePushStatus.INSTALL_UPDATE,
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
            code: CodePushStatus.FINISH,
            message: 'update-ignored',
          },
          isMounted,
        );
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        codePushProcessComplete(
          {
            code: CodePushStatus.FINISH,
            message: 'update-to-date',
          },
          isMounted,
        );
        break;

      default:
        codePushProcessComplete(
          {
            code: CodePushStatus.FINISH,
            message: status + '',
          },
          isMounted,
        );
        break;
    }
  };

  React.useEffect(() => {
    // update code push success
    if (processing?.code === CodePushStatus.FINISH) {
      dispatch(app.loadingSuccess());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [processing]);

  React.useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    try {
      codePushProcessComplete(
        {
          code: CodePushStatus.CHECK_UPDATE,
          message: 'check-update',
        },
        isMounted,
      );

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
                  code: CodePushStatus.FINISH,
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
                code: CodePushStatus.FINISH,
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
    <CustomImageBackground
      source={images.watermark_background_transparent}
      style={styles.container}>
      <Image source={images.loading_welcome} style={styles.ic_bee_man} />
      <Image
        source={images.icons.ic_text_jollibee}
        style={styles.ic_text}
        resizeMode="center"
      />
      <View style={styles.container_footer}>
        {/* Download package progress */}
        {processing?.code === CodePushStatus.DOWNLOAD_PACKAGE &&
          processing?.progress > 0 && (
            <Text style={styles.textDownloadProgress}>
              {translate('txtDownloadPackage') +
                Math.min(processing?.progress, 100) +
                '%'}
            </Text>
          )}

        {/* Installing package */}
        {processing?.code === CodePushStatus.INSTALL_UPDATE && (
          <Text style={styles.textDownloadProgress}>
            {translate('txtInstallingPackage')}
          </Text>
        )}
        {processing?.code === CodePushStatus.CHECK_UPDATE && (
          <Text style={styles.textDownloadProgress}>
            {translate('txtCheckUpdate')}
          </Text>
        )}
        {processing?.code === CodePushStatus.FINISH && (
          <Text style={styles.textDownloadProgress}>
            {translate('txtLoadingApp')}
          </Text>
        )}

        {/* Debug status */}
        {/* {processing && (
            <Text style={styles.textDownloadProgress}>
              {processing?.code + '----' + processing?.message}
            </Text>
          )} */}
      </View>
    </CustomImageBackground>
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
    bottom: scale.scaleHeight(30),
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
    fontSize: scaleWidth(18),
    fontFamily: 'Roboto-Regular',
    color: AppStyles.colors.text,
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
  checkFrequency: codePush.CheckFrequency.MANUAL, //  only check when codePush.sync() is called in app code
  installMode: codePush.InstallMode.IMMEDIATE,
};

// let codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

const SplashScreen = codePush(codePushOptions)(Splash);
export default SplashScreen;
