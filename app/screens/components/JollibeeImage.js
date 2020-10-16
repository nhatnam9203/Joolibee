import { Text, View, StyleSheet } from 'react-native';
import { Config } from 'react-native-config';
import React from 'react';
import { images } from '@theme';
import FastImage from 'react-native-fast-image';

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
  const onError = () => setDownload(-1);

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
    <>
      <FastImage
        style={style}
        source={source ?? defaultSource}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onLoadEnd={onLoadEnd}
        onError={onError}
      />
      {download > 0 && (
        <View style={styles.container}>
          <Text>{download + '%'}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#fff9',
  },
});
