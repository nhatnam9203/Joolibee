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
        switch (status) {
          case codePush.SyncStatus.UPDATE_INSTALLED:
            // self.setState({ modalVisible: true });
            Logger.info(status, 'useCodePushUpdate -> UPDATE_INSTALLED');
            setProgress(100);
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
