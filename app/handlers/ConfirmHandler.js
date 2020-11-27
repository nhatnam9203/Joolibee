import { account } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';
import { PopupConfirm } from '../screens/components';

const ConfirmHandler = React.forwardRef(({ children }, ref) => {
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    show: () => {
      setShowPopup(true);
    },
  }));

  return (
    <PopupConfirm visible={showPopup} onToggle={() => setShowPopup(false)} />
  );
});

export default ConfirmHandler;
