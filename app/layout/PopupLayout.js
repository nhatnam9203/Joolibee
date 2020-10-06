import { CustomModal } from '@components';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

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
        onPress={dismiss}
        activeOpacity={1}
        style={styles.container}>
        <TouchableOpacity activeOpacity={1} style={styles.content}>
          {children}
        </TouchableOpacity>
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
  content: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
});

export default PopupLayout;
