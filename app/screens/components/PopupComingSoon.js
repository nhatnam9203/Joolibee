import { PopupLayout } from '@layouts';
import { translate } from '@localize';
import { AppStyles } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { ButtonCC, LabelTitle } from '../components';

export const PopupComingSoon = ({ visible, onToggle }) => {
  const popupRef = React.createRef(null);

  return (
    <PopupLayout visible={visible} onToggle={onToggle} ref={popupRef}>
      <View style={styles.container}>
        <LabelTitle
          label={translate('txtNotification')}
          color={AppStyles.colors.accent}
          fontSize={22}
        />

        <Text style={styles.txtDescription}>
          {translate('txtInComingSoon')}
        </Text>

        <ButtonCC.ButtonYellow
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
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  txtDescription: {
    ...AppStyles.fonts.text,
    fontSize: 16,
    color: '#1B1B1B',
    textAlign: 'center',
    marginBottom: 15,
  },

  buttonStyle: {
    width: '80%',
  },
});
