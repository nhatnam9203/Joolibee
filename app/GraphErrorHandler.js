import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOutRequest } from '@slices/account';

const GraphErrorHandler = React.forwardRef(({ children }, ref) => {
  const dispatch = useDispatch();

  React.useImperativeHandle(ref, () => ({
    forceLogout: () => {
      dispatch(signOutRequest);
    },
  }));

  return <>{children}</>;
});

export default GraphErrorHandler;
