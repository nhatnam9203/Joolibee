import codePush from 'react-native-code-push';
import React from 'react';

export const useCodePushUpdate = () => {
  const [processing, setProcessing] = React.useState(null);

  const checkCodePushUpdate = () => {
    try {
      codePush
        .checkForUpdate()
        .then((update) => {
          if (update) {
            if (update.failedInstall) {
              /* đã update */
              codePushProcessComplete({ code: 'installed' });
            } else {
              let options = {
                updateDialog: true,
                installMode: codePush.InstallMode.ON_NEXT_RESTART,
                mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
              };

              codePush.sync(
                options,
                codePushStatusChange,
                codePushDownloadProgress,
              );
            }
          } else {
            codePushProcessComplete({ code: 'had-update' });
          }
        })
        .catch((err) => {
          codePushProcessComplete({ code: 'check-update-error', err });
        });
    } catch (err) {
      codePushProcessComplete({ code: 'check-update-error', err });
    }
  };

  const codePushProcessComplete = (values) => {
    setProcessing(values);
  };

  const codePushStatusChange = (status) => {
    switch (status) {
      case codePush.SyncStatus.UPDATE_INSTALLED:
        // self.setState({ modalVisible: true });
        codePushProcessComplete({ code: 'update-installed' });

        break;
      case codePush.SyncStatus.SYNC_IN_PROGRESS:
        // self.setState({ modalVisible: true });
        Logger.info('Sync In Progress', 'useCodePushUpdate');
        break;
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        Logger.info('Checking for updates.', 'useCodePushUpdate');
        break;
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        Logger.info('Downloading package.', 'useCodePushUpdate');
        // Show "downloading" modal
        codePushProcessComplete({ code: 'download-package' });

        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        Logger.info('Installing update.', 'useCodePushUpdate');
        // Hide "downloading" modal

        break;
      case codePush.SyncStatus.UP_TO_DATE:
      default:
        codePushProcessComplete({ code: 'update-to-date' });
        break;
    }
  };

  const codePushDownloadProgress = ({ receivedBytes, totalBytes }) => {
    setProcessing(
      Object.assign({}, processing, {
        progress: (receivedBytes / totalBytes).toFixed(2) * 100,
      }),
    );
  };

  // React.useEffect(() => {}, []);

  return { checkCodePushUpdate, processing };
};
