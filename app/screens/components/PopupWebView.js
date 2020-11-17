import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { AppStyles, images } from '@theme';
import { scale } from '@utils';

const { scaleWidth, scaleHeight } = scale;
const Index = ({ visible, onToggle }) => {
  const popupRef = React.createRef(null);

  return (
    <Modal visible={visible} ref={popupRef}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={onToggle}>
            <Image source={images.icons.popup_close} />
          </TouchableOpacity>
        </View>
        <WebView
          renderLoading={() => <ActivityIndicator animating color="red" />}
          startInLoadingState={true}
          scrollEnabled={true}
          source={{
            uri:
              'https://jollibee.com.vn/tin-tuc/kham-pha-nha-may-dat-chuan-iso-22000-2018-cua-jollibee',
          }}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',

    flex: 1,
    backgroundColor: AppStyles.colors.white,
  },
  iconContainer: {
    // width: '100%',
    // height: 60,
    // backgroundColor: 'white',
    position: 'absolute',
    top: 15,
    zIndex: 10000,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  icon_jollibee: {
    resizeMode: 'contain',
    width: scaleWidth(126),
    height: scaleHeight(126),
  },
});
export default Index;
