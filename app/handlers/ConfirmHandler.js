import { account } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';
import { PopupConfirm } from '../screens/components';

export const ConfirmHandler = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [popupInfo, setPopupInfo] = React.useState(null);

  React.useImperativeHandle(ref, () => ({
    show: (title, message, onAccept) => {
      setPopupInfo({
        title,
        message,
        onAccept,
      });
    },
  }));

  return (
    <PopupConfirm
      visible={popupInfo !== null}
      onToggle={() => setPopupInfo(null)}
      message={popupInfo?.message}
      title={popupInfo?.title}
      onAccept={popupInfo?.onAccept}
    />
  );
});
