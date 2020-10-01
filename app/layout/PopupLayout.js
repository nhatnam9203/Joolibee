import { CustomModal } from '@components';
import { AppStyles } from '@theme';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const PopupLayout = ({ visible, onToggle, children }) => {
  return (
    <CustomModal.CustomModal showModal={visible} onDismiss={onToggle}>
      <View style={styles.container}>{children}</View>
    </CustomModal.CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PopupLayout;
