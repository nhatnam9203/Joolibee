import account from './account';
import app from './app';
import order from './order';
import setting from './setting';
import store from './store';
import cart from './cart';
import address from './address';

const rootReducers = Object.assign(
  {},
  {
    account: account.reducer,
    app: app.reducer,
    order: order.reducer,
    setting: setting.reducer,
    store: store.reducer,
    cart: cart.reducer,
    address: address.reducer,
  },
);

module.exports = {
  rootReducers,
  account: account.actions,
  app: app.actions,
  order: order.actions,
  setting: setting.actions,
  store: store.actions,
  cart: cart.actions,
  address: address.actions,
};
