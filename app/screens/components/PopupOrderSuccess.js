import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as ButtonCC from './ButtonCC';
import { LabelTitle } from './LabelTitle';

const BUTTON_WIDTH = '80%';
const TITLE_SIZE = 24;

export const PopupOrderSuccess = ({
  visible,
  onToggle,
  message = translate('txtNoticeEnvironment'),
  orderCode = '00909',
}) => {
  const popupRef = React.createRef(null);

  return (
    <PopupLayout
      disableBackdrop={true}
      visible={visible}
      onToggle={onToggle}
      ref={popupRef}>
      <View style={styles.container}>
        <Image source={images.icons.ic_succeeded} />

        <LabelTitle
          label={translate('txtOrderSucceeded')}
          color={AppStyles.colors.accent}
          fontSize={TITLE_SIZE}
        />

        <Text style={styles.txtDescription}>
          {translate('txtYourOrderCode') +
            orderCode +
            '\n' +
            translate('txtThankForYourOrder')}
        </Text>

        <ButtonCC.ButtonYellow
          label={translate('txtContinueOrder')}
          width={BUTTON_WIDTH}
          onPress={() => popupRef.current.forceQuit()}
        />

        <ButtonCC.ButtonRed
          label={translate('txtFollowOrder')}
          width={BUTTON_WIDTH}
          onPress={() => popupRef.current.forceQuit()}
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
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
  },

  txtDescription: {
    ...AppStyles.fonts.text,
    fontSize: 16,
    color: '#1B1B1B',
    textAlign: 'center',
    marginVertical: 10,
  },

  buttonStyle: {
    width: '80%',
  },
});
