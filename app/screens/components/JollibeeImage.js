import { Text, View, StyleSheet } from 'react-native';
import { Config } from 'react-native-config';
import React from 'react';
import { images } from '@theme';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-spinkit';
import { useImageDimensions } from '@react-native-community/hooks';

export const JollibeeImage = ({
  url,
  style,
  defaultSource = images.menu_3,
  width,
  height,
  ...props
}) => {
  const [source, setSource] = React.useState(null);
  const [download, setDownload] = React.useState(-1);

  const onLoadStart = () => setDownload(0);
  const onProgress = ({ nativeEvent: { loaded, total } }) => {
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
    <View
      style={[styles.container, width && height ? { width, height } : style]}>
      <FastImage
        source={source ?? defaultSource}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        onLoadEnd={onLoadEnd}
        onError={onError}
        style={[styles.imgContent, style]}
        {...props}
      />
      {download > 0 && (
        <View style={styles.spinnerContent}>
          <Spinner size={15} type="Circle" color="#2B2B2B" />
          <Text style={styles.textDownload}>{download + '%'}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 0 },

  spinnerContent: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textDownload: {
    color: '#2B2B2B',
    fontSize: 10,
    textAlign: 'center',
    width: '100%',
    marginTop: 5,
  },

  imgContent: {},
});
