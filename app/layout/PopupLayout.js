import { CustomModal } from '@components';
import React from 'react';

const PopupLayout = React.forwardRef(
  ({ visible, onToggle, children, ...props }, ref) => {
    const modalRef = React.createRef(null);

    const dismiss = () => {
      modalRef.current.dismiss();
    };

    React.useImperativeHandle(ref, () => ({
      forceQuit: dismiss,
    }));

    return (
      <CustomModal
        showModal={visible}
        onDismiss={onToggle}
        ref={modalRef}
        {...props}>
        {children}
      </CustomModal>
    );
  },
);

export default PopupLayout;
