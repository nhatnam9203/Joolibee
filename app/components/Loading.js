import React from 'react';
import Spinner from 'react-native-spinkit';
import { View, StyleSheet } from 'react-native';

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
        { backgroundColor: transparent ? 'transparent' : '#00000060' },
      ]}>
      <Spinner
        style={styles.spinner}
        size={100}
        type="Circle"
        color="#E31837"
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
});
export default Loading;
