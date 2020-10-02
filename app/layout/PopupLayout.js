import { CustomModal } from '@components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const PopupLayout = React.forwardRef(({ visible, onToggle, children }, ref) => {
  const modalRef = React.createRef(null);

  const dismiss = () => {
    modalRef.current.dismiss();
  };

  React.useImperativeHandle(ref, () => ({
    forceQuit: dismiss,
  }));

  return (
    <CustomModal.CustomModal
      showModal={visible}
      onDismiss={onToggle}
      ref={modalRef}>
      <TouchableOpacity
        style={styles.container}
        onPress={dismiss}
        activeOpacity={1}>
        {children}
      </TouchableOpacity>
    </CustomModal.CustomModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PopupLayout;
