import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ButtonCC, LabelTitle } from '../components';
import { scale } from '@utils';

const { scaleWidth, scaleHeight } = scale;

export const PopupConfirm = ({
  visible,
  onToggle,
  message,
  title,
  onAccept,
}) => {
  const popupRef = React.createRef(null);

  const acceptButtonPressed = () => {
    if (typeof onAccept === 'function') {
      onAccept();
    }
    popupRef.current.forceQuit();
  };

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <View style={styles.container}>
        <View style={styles.header}>
          <LabelTitle
            label={title ?? translate('txtNotification')}
            color={AppStyles.colors.text}
            fontSize={24}
          />
        </View>

        <Text style={styles.txtDescription}>
          {message ?? translate('txtInComingSoon')}
        </Text>

        <View style={styles.buttonContent}>
          <ButtonCC.ButtonGray
            label={translate('txtCancel')}
            onPress={() => popupRef.current.forceQuit()}
            width={'50%'}
          />
          <View style={styles.horizontalSpace} />
          <ButtonCC.ButtonRed
            label={translate('txtAccept')}
            onPress={acceptButtonPressed}
            width={'50%'}
          />
        </View>
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
    backgroundColor: '#fff',
    borderRadius: scaleWidth(24),
    overflow: 'hidden',
  },

  header: {
    height: scaleHeight(70),
    width: '100%',
    backgroundColor: AppStyles.colors.button,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scaleHeight(10),
  },

  txtDescription: {
    ...AppStyles.fonts.medium_SVN,
    fontSize: scaleWidth(21),
    color: '#1B1B1B',
    textAlign: 'center',
    marginBottom: scaleHeight(10),
  },

  buttonContent: {
    ...AppStyles.styles.horizontalLayout,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonStyle: {
    width: '80%',
  },

  horizontalSpace: {
    width: scaleWidth(15),
    height: '100%',
  },
});
