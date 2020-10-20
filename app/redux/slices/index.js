import accountReducer from './account';
import appReducer from './app';
import orderReducer from './order';
import settingReducer from './setting';
import storeReducer from './store';
export default Object.assign(
  {},
  {
    account: accountReducer,
    app: appReducer,
    order: orderReducer,
    setting: settingReducer,
    store: storeReducer,
  },
);
