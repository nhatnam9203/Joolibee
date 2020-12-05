import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Loading } from '@components';
import { scale } from '@utils';
import { AppStyles } from '@theme';
const { scaleHeight } = scale;
export default function JollibeeVN() {
  return (
    <View style={{ flex: 1 }}>
      <WebView
        // style={styles.container}
        renderLoading={() => <Loading isLoading={true} transparent={true} />}
        startInLoadingState={true}
        scrollEnabled={true}
        source={{
          uri: 'https://jollibee.com.vn/ve-jollibee',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //position: 'absolute',
    top: -scaleHeight(90),
    // height: '120%',
    width: '100%',
  },
});
