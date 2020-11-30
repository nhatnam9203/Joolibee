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
import { Loading } from '@components';
import { scale } from '@utils';

const { scaleWidth, scaleHeight } = scale;
const Index = ({ visible, onToggle }) => {
  const popupRef = React.createRef(null);

  return (
    <Modal visible={visible} ref={popupRef}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onToggle}>
          <Image source={images.icons.popup_close} />
        </TouchableOpacity>
      </View>
      <WebView
        style={styles.container}
        renderLoading={() => <Loading isLoading={true} transparent={true} />}
        startInLoadingState={true}
        scrollEnabled={true}
        source={{
          uri:
            'https://jollibee.com.vn/tin-tuc/kham-pha-nha-may-dat-chuan-iso-22000-2018-cua-jollibee',
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -scaleHeight(90),
    height: '120%',
    width: '100%',
  },
  iconContainer: {
    position: 'absolute',
    top: scaleHeight(45),
    zIndex: 10000,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  icon_jollibee: {
    resizeMode: 'contain',
    width: scaleWidth(126),
    height: scaleHeight(126),
  },
});
export default Index;
