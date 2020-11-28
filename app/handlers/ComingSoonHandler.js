import { account } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';
import { PopupComingSoon } from '../screens/components';

export const ComingSoonHandler = React.forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const [showComingSoon, setShowComingSoon] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    show: () => {
      setShowComingSoon(true);
    },
  }));

  return (
    <PopupComingSoon
      visible={showComingSoon}
      onToggle={() => {
        setShowComingSoon(false);
      }}
    />
  );
});
