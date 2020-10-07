import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles, images } from '@theme';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as ButtonCC from './ButtonCC';

const BUTTON_WIDTH = '80%';

export const PopupNoticeEnvironment = ({
  visible,
  onToggle,
  message = translate('txtNoticeEnvironment'),
}) => {
  const popupRef = React.createRef(null);

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <View style={styles.container}>
        <Image source={images.icons.ic_use_tools} />

        <Text style={styles.txtDescription}>{message}</Text>

        <ButtonCC.ButtonYellow
          label={translate('txtClose')}
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
  },

  txtDescription: {
    ...AppStyles.fonts.text,
    fontSize: 16,
    color: '#1B1B1B',
    textAlign: 'center',
    marginVertical: 25,
  },

  buttonStyle: {
    width: '80%',
  },
});
