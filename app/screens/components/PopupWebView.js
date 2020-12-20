import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Text,
} from 'react-native';
import WebView from 'react-native-webview';
import { AppStyles, images } from '@theme';
import { Loading } from '@components';
import { scale } from '@utils';
import FastImage from 'react-native-fast-image';

const { scaleWidth, scaleHeight } = scale;

const Index = ({ visible, item, onToggle, url = null }) => {
  const popupRef = React.createRef(null);

  const source = url
    ? { uri: url }
    : {
        html: item?.content,
      };

  Logger.debug(source, '=====> source');
  return (
    <Modal visible={visible} ref={popupRef}>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={onToggle}>
          <Image source={images.icons.popup_close} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {item?.featured_image && (
          <FastImage
            style={styles.imgProduct}
            source={{ uri: item?.featured_image }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        )}

        {item?.title && <Text style={styles.txtTitle}>{item?.title}</Text>}

        <WebView
          style={styles.web}
          renderLoading={() => <Loading isLoading={true} transparent={true} />}
          startInLoadingState={true}
          source={source}
          automaticallyAdjustContentInsets={false}
        />
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  web: {
    flex: 1,
    height: scaleHeight(300),
  },

  scrollView: {
    flex: 1,
  },

  scrollViewContent: {
    backgroundColor: '#fff',
    flex: 0,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
  },

  iconContainer: {
    position: 'absolute',
    top: scaleHeight(45),
    zIndex: 1000,
    justifyContent: 'center',
    paddingLeft: 15,
  },

  icon_jollibee: {
    resizeMode: 'contain',
    width: scaleWidth(126),
    height: scaleHeight(126),
  },

  imgProduct: {
    height: scaleHeight(300),
    width: '100%',
    marginBottom: scaleHeight(10),
  },

  txtTitle: {
    ...AppStyles.fonts.header,
    width: '100%',
    textAlign: 'center',
  },
});
export default Index;
