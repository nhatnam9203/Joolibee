import { account, app } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';

const GraphErrorHandler = React.forwardRef(({ children }, ref) => {
  const dispatch = useDispatch();

  React.useImperativeHandle(ref, () => ({
    forceLogout: () => {
      dispatch(account.signOutRequest());
    },
    hideLoading: () => {
      dispatch(app.hideLoading());
    },
  }));

  return <>{children}</>;
});

export default GraphErrorHandler;
