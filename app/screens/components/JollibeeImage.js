import { Text, View, StyleSheet } from 'react-native';
import { Config } from 'react-native-config';
import React from 'react';
import { images } from '@theme';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-spinkit';

export const JollibeeImage = ({
  url,
  style,
  defaultSource = images.menu_3,
}) => {
  const [source, setSource] = React.useState(null);
  const [download, setDownload] = React.useState(-1);

  const onLoadStart = () => setDownload(0);
  const onProgress = ({ nativeEvent: { loaded, total } }) => {
    // Logger.debug(event, 'Load image event ');
    setDownload((loaded / total).toFixed(2) * 100);
  };
  const onLoadEnd = () => setDownload(-1);
  const onError = () => {
    setDownload(-1);
    setSource(defaultSource);
  };

  React.useEffect(() => {
    if (url) {
      const fullPath = url.includes(Config.DOMAIN)
        ? url
        : `${Config.DOMAIN}${url}`;
      // Logger.info(fullPath, 'JollibeeImage -> url');
      setSource({ uri: fullPath, priority: FastImage.priority.normal });
    }
  }, [url]);

  return (
    <View style={style}>
      <FastImage
        style={styles.imgContent}
        source={source ?? defaultSource}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onLoadEnd={onLoadEnd}
        onError={onError}
      />
      {download > 0 && (
        <View style={styles.spinnerContent}>
          {/* <Text>{download + '%'}</Text> */}
          <Spinner size={15} type="Circle" color="#707070" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgContent: { flex: 1 },
  spinnerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
