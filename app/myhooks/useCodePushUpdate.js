import codePush from 'react-native-code-push';
import React from 'react';

export const CodePushStatus = {
  SUCCESS: 1,
  PROCESSING: 2,
  ERROR: -1,
  FAILED: -2,
};

export const useCodePushUpdate = () => {
  const [processing, setProcessing] = React.useState({
    code: CodePushStatus.PROCESSING,
    message: 'init',
  });

  const checkCodePushUpdate = () => {
    try {
      codePush
        .checkForUpdate()
        .then((update) => {
          if (update) {
            if (update.isFirstRun && update.description) {
              // Display a "what's new?" modal
              codePushProcessComplete({
                code: CodePushStatus.PROCESSING,
                message: update.description,
              });
            } else if (update.failedInstall) {
              /* đã update */
              codePushProcessComplete({
                code: CodePushStatus.SUCCESS,
                message: 'update-rollbacks',
              });
            } else {
              let options = {
                updateDialog: true,
                installMode: codePush.InstallMode.IMMEDIATE,
                mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
              };

              codePush.sync(
                options,
                codePushStatusChange,
                codePushDownloadProgress,
              );
            }
          } else {
            codePushProcessComplete({
              code: CodePushStatus.SUCCESS,
              message: 'had-updated',
            });
          }
        })
        .catch((err) => {
          codePushProcessComplete({
            code: CodePushStatus.ERROR,
            message: 'error',
            err,
          });
        });
    } catch (err) {
      codePushProcessComplete({
        code: CodePushStatus.ERROR,
        message: 'error',
        err,
      });
    }
  };

  const codePushProcessComplete = (values) => {
    setProcessing(values);
  };

  const codePushStatusChange = (status) => {
    switch (status) {
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // self.setState({ modalVisible: true });
        codePushProcessComplete({
          code: CodePushStatus.SUCCESS,
          message: 'update-installed',
        });
        break;
      case codePush.SyncStatus.SYNC_IN_PROGRESS:
        // self.setState({ modalVisible: true });
        codePushProcessComplete({
          code: CodePushStatus.PROCESSING,
          message: 'sync-in-progress',
        });
        break;
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        codePushProcessComplete({
          code: CodePushStatus.PROCESSING,
          message: 'check-for-update',
        });
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        codePushProcessComplete({
          code: CodePushStatus.PROCESSING,
          message: 'download-package',
        });
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        codePushProcessComplete({
          code: CodePushStatus.PROCESSING,
          message: 'installing-update',
        });
        break;
      case codePush.SyncStatus.AWAITING_USER_ACTION:
        codePushProcessComplete({
          code: CodePushStatus.PROCESSING,
          message: 'awaiting-user-action',
        });
        break;
      case codePush.SyncStatus.UPDATE_IGNORED:
        codePushProcessComplete({
          code: CodePushStatus.SUCCESS,
          message: 'update-ignored',
        });
        break;
      case codePush.SyncStatus.UP_TO_DATE:
        codePushProcessComplete({
          code: CodePushStatus.SUCCESS,
          message: 'update-to-date',
        });
        break;

      default:
        codePushProcessComplete({
          code: CodePushStatus.SUCCESS,
          message: status + '',
        });
        break;
    }
  };

  const codePushDownloadProgress = ({ receivedBytes, totalBytes }) => {
    setProcessing(
      Object.assign({}, processing, {
        progress: Math.round((receivedBytes / totalBytes).toFixed(2) * 100),
      }),
    );
  };

  // React.useEffect(() => {}, []);

  return { checkCodePushUpdate, processing };
};
