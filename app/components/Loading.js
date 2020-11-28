import React from 'react';
import Spinner from 'react-native-spinkit';
import { View, StyleSheet, Image } from 'react-native';

const LOADING_TIME_OUT = 60000;
let timer;
const Loading = ({
  isLoading,
  onCancelLoading,
  transparent = false,
  imageSize = '10%',
  spinKit,
}) => {
  const [showLoading, setShowLoading] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      timer = setTimeout(() => {
        if (onCancelLoading) {
          onCancelLoading();
        }

        clearTimeout(timer);
      }, LOADING_TIME_OUT);
    }

    setShowLoading(isLoading);
  }, [isLoading, onCancelLoading]);

  return showLoading ? (
    <View
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        { backgroundColor: transparent ? 'transparent' : '#0005' },
      ]}>
      {spinKit ? (
        <Spinner
          style={styles.spinner}
          type={spinKit ?? 'CircleFlip'}
          size={imageSize}
          color="#fff"
        />
      ) : (
        <View
          style={[
            styles.imageBgStyle,
            { height: imageSize, width: imageSize },
          ]}>
          <Image
            style={styles.imageStyle}
            source={require('../assets/images/jollibee-wellcome-gift.gif')}
          />
        </View>
      )}
    </View>
  ) : (
    []
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageStyle: {
    resizeMode: 'contain',
    flex: 1,
  },

  imageBgStyle: {
    shadowColor: '#000A',
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    elevation: 4,

    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loading;
