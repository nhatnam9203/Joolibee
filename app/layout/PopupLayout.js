import { CustomModal } from '@components';
import React from 'react';
import { StyleSheet } from 'react-native';

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
      {children}
    </CustomModal.CustomModal>
  );
});

export default PopupLayout;
