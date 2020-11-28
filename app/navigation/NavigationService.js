import * as React from 'react';

export const navigationRef = React.createRef();
export const dropdownRef = React.createRef();
export const graphQLErrorRef = React.createRef();
export const confirmRef = React.createRef();
export const comingSoonRef = React.createRef();

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
  graphQLErrorRef.current?.hideLoading();
}

function logout() {
  graphQLErrorRef.current?.forceLogout();
}

function showConfirm(title, message, onAccept) {
  confirmRef.current?.show(title, message, onAccept);
}
function showComingSoon() {
  comingSoonRef.current?.show();
}

export default {
  navigate,
  goBack,
  alert,
  alertWithError,
  logout,
  showConfirm,
  showComingSoon,
};
