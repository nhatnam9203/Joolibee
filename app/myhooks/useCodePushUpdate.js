import codePush from 'react-native-code-push';
import React from 'react';

const useCodePushUpdate = () => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    codePush.sync(
      {
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      (status) => {
        Logger.info(status, 'useCodePushUpdate -> status');

        switch (status) {
          case codePush.SyncStatus.UPDATE_INSTALLED:
            // self.setState({ modalVisible: true });
            Logger.info(status, 'useCodePushUpdate -> UPDATE_INSTALLED');
            break;
          case codePush.SyncStatus.SYNC_IN_PROGRESS:
            // self.setState({ modalVisible: true });
            Logger.info(status, 'useCodePushUpdate -> SYNC_IN_PROGRESS');
            break;
          case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            Logger.info('Checking for updates.', 'useCodePushUpdate');
            break;
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            Logger.info('Downloading package.', 'useCodePushUpdate');
            // Show "downloading" modal

            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            Logger.info('Installing update.', 'useCodePushUpdate');
            // Hide "downloading" modal

            break;
          case codePush.SyncStatus.UP_TO_DATE:
            Logger.info('Up-to-date.', 'useCodePushUpdate');
            setProgress(0);
            break;
        }
      },
      ({ receivedBytes, totalBytes }) => {
        /* Update download modal progress */
        // self.setState({
        //   status: 'Downloaded ' + receivedBytes + ' of ' + totalBytes,
        // });
        setProgress((receivedBytes / totalBytes) * 100);
        Logger.info(
          'Downloaded ' + receivedBytes + ' of ' + totalBytes,
          'useCodePushUpdate',
        );
      },
    );
  }, []);

  return [progress];
};

export default useCodePushUpdate;
