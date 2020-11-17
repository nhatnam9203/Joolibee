import React from 'react';
import Spinner from 'react-native-spinkit';
import { View, StyleSheet, Image } from 'react-native';

const LOADING_TIME_OUT = 30000;
let timer;
const Loading = ({ isLoading, onCancelLoading, transparent = false }) => {
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
        { backgroundColor: transparent ? 'transparent' : '#00000080' },
      ]}>
      {/* <Spinner style={styles.spinner} size={30} type="Circle" color="#E31837" /> */}
      <Image
        style={styles.imageStyle}
        source={require('../assets/images/jollibee-wellcome-gift.gif')}
      />
    </View>
  ) : (
    []
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  spinner: {
    marginBottom: 50,
  },

  imageStyle: {
    resizeMode: 'contain',
    height: '20%',
    width: '20%',
  },
});
export default Loading;
