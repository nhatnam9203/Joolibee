import React from 'react';
import Spinner from 'react-native-spinkit';
import { View, StyleSheet } from 'react-native';

let timer;
const Loading = ({ isLoading, onCancelLoading }) => {
  const [showLoading, setShowLoading] = React.useState(false);

  React.useEffect(() => {
    if (isLoading) {
      timer = setTimeout(() => {
        if (onCancelLoading) {
          onCancelLoading();
        }

        clearTimeout(timer);
      }, 30000);
    }

    setShowLoading(isLoading);
  }, [isLoading, onCancelLoading]);

  return showLoading ? (
    <View style={styles.container}>
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
    backgroundColor: '#00000060',
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
