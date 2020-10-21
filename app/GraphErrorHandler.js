import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { account } from '@slices';

const GraphErrorHandler = React.forwardRef(({ children }, ref) => {
  const dispatch = useDispatch();

  React.useImperativeHandle(ref, () => ({
    forceLogout: () => {
      dispatch(account.signOutRequest());
    },
  }));

  return <>{children}</>;
});

export default GraphErrorHandler;
