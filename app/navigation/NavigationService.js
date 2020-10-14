import * as React from 'react';

export const navigationRef = React.createRef();
export const dropdownRef = React.createRef();

function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function alert({ type = 'info', title, message, payload, interval }) {
  dropdownRef.current?.alertWithType(type, title, message, payload, interval);
}

function alertWithError(error) {
  alert(Object.assign({}, error, { type: 'error' }));
}

export default {
  navigate,
  goBack,
  alert,
  alertWithError,
};
