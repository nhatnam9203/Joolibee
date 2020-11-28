import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ButtonCC, LabelTitle } from '../components';
import { scale } from '@utils';

const { scaleWidth, scaleHeight } = scale;

export const PopupComingSoon = ({ visible, onToggle }) => {
  const popupRef = React.createRef(null);

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <View style={styles.container}>
        <View style={styles.header}>
          <LabelTitle
            label={translate('txtNotification')}
            color={AppStyles.colors.text}
            fontSize={24}
          />
        </View>

        <Text style={styles.txtDescription}>
          {translate('txtInComingSoon')}
        </Text>

        <ButtonCC.ButtonRed
          label={translate('txtClose')}
          width={200}
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
    ...AppStyles.fonts.medium,
    fontSize: scaleWidth(21),
    color: '#1B1B1B',
    textAlign: 'center',
    marginBottom: scaleHeight(10),
  },

  buttonStyle: {
    width: '80%',
  },
});
