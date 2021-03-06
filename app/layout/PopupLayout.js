import { CustomModal } from '@components';
import React from 'react';

const PopupLayout = React.forwardRef(
  ({ visible, onToggle, children, disableBackdrop }, ref) => {
    const modalRef = React.createRef(null);

    const dismiss = () => {
      modalRef.current.dismiss();
    };

    React.useImperativeHandle(ref, () => ({
      forceQuit: dismiss,
    }));

    return (
      <CustomModal
        disableBackdrop={disableBackdrop}
        showModal={visible}
        onDismiss={onToggle}
        ref={modalRef}>
        {children}
      </CustomModal>
    );
  },
);

export default PopupLayout;
