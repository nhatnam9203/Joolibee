import { app } from '@slices';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSignInFlow } from '@hooks';

const GraphErrorHandler = React.forwardRef(({ children }, ref) => {
  const dispatch = useDispatch();
  const [, signOut] = useSignInFlow();

  React.useImperativeHandle(ref, () => ({
    forceLogout: () => {
      signOut();
    },
    hideLoading: () => {
      dispatch(app.hideLoading());
    },
  }));

  return <>{children}</>;
});

export default GraphErrorHandler;
