import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Config } from 'react-native-config';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-spinkit';
import { PlaceholderMedia, Placeholder, Fade } from 'rn-placeholder';
import * as Animatable from 'react-native-animatable';

const LoadingImage = ({ width, height }) => (
  <View style={[styles.container, { width: width, height: height }]}>
    <PlaceholderMedia style={styles.imgPlaceholder} />
  </View>
);

export const JollibeeImage = React.memo(
  ({
    url,
    width,
    height,
    defaultSource,
    resizeMode = FastImage.resizeMode.contain,
    style,
  }) => {
    const [download, setDownload] = React.useState(-1);

    // Callback functions
    const onLoadStart = () => setDownload(0);
    const onProgress = ({ nativeEvent: { loaded, total } }) => {
      setDownload(Math.round((loaded / total).toFixed(2) * 100));
    };
    const onLoadEnd = () => setDownload(-1);
    const onError = () => {
      setDownload(-1);
    };

    let fullPath = React.useMemo(() => {
      if (url && typeof url === 'string') {
        fullPath = url.includes(Config.DOMAIN) ? url : `${Config.DOMAIN}${url}`;
        return fullPath;
      }

      return url;
    }, [url]);

    return fullPath || defaultSource ? (
      <Animatable.View
        style={[styles.container, { width: width, height: height }, style]}>
        <FastImage
          style={{ width: width, height: height }}
          source={
            url
              ? { uri: fullPath, priority: FastImage.priority.normal }
              : defaultSource
          }
          resizeMode={resizeMode}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          onLoadEnd={onLoadEnd}
          onError={onError}
        />

        {typeof download === 'number' && download > 0 && (
          <View style={styles.spinnerContent}>
            <Spinner size={15} type="Circle" color="#2B2B2B" />
            <Text style={styles.textDownload}>{download + '%'}</Text>
          </View>
        )}
      </Animatable.View>
    ) : (
      <LoadingImage width={width} height={height} />
    );
  },
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

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

  imgPlaceholder: {
    width: '80%',
    height: '80%',
    alignSelf: 'center',
  },
});
