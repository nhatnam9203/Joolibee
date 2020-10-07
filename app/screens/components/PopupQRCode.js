import { CustomFlatList } from '@components';
import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ButtonCC, OrderItem, LabelTitle } from '../components';
import QRCode from 'react-native-qrcode-svg';

const QRCODE_SIZE = 180;
const QRCODE_LOGO_MARGIN = 8;
const QRCODE_LOGO_SIZE = 60 - QRCODE_LOGO_MARGIN;
const TITLE_FONT_SIZE = 30;

export const PopupQRCode = ({ visible, onToggle, code = '0001234567' }) => {
  const popupRef = React.createRef(null);

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <View style={styles.container}>
        <LabelTitle
          label={translate('txtQRCode')}
          color={AppStyles.colors.accent}
          fontSize={TITLE_FONT_SIZE}
        />

        <Text style={styles.txtDescription}>
          {translate('txtQrCodeDescription')}
        </Text>

        <QRCode
          value={code}
          logo={images.icons.ic_qr_logo}
          logoSize={QRCODE_LOGO_SIZE}
          size={QRCODE_SIZE}
          logoBackgroundColor="#fff"
          logoBorderRadius={QRCODE_LOGO_SIZE / 2}
          logoMargin={QRCODE_LOGO_MARGIN}
        />

        <Text style={styles.txtCodeStyle}>{code}</Text>

        <ButtonCC.ButtonYellow
          label={translate('txtClose')}
          width={200}
          onPress={() => {
            popupRef.current.forceQuit();
          }}
        />
      </View>
    </PopupLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    width: '90%',
    maxHeight: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },

  txtDescription: {
    ...AppStyles.fonts.text,
    fontSize: 16,
    color: '#1B1B1B',
    textAlign: 'center',
    marginBottom: 15,
  },

  txtCodeStyle: {
    ...AppStyles.fonts.medium,
    fontSize: 24,
    color: '#1B1B1B',
    marginTop: 15,
  },

  buttonStyle: {
    width: '80%',
  },
});
