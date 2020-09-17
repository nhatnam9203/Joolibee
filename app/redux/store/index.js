import AsyncStorage from '@react-native-community/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { applyMiddleware } from 'redux';
import { createInjectorsEnhancer } from 'redux-injectors';
import {
  persistCombineReducers,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducers from '../slices'; // where reducers is a object of reducers
import sagas from '../sagas';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['app'],
  debug: process.env.NODE_ENV !== 'production', //to get useful logging
};
const initialState = {};
const middleware = [];
const reduxSagaMonitorOptions = {};

const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
middleware.push(sagaMiddleware);
const { run: runSaga } = sagaMiddleware;

if (__DEV__) {
  // middleware.push(createLogger());
}

const reducers = persistCombineReducers(config, rootReducers);
const enhancers = [
  applyMiddleware(...middleware),
  createInjectorsEnhancer({
    createReducer: reducers,
    runSaga,
  }),
];
const persistConfig = { enhancers };
const store = configureStore({
  reducer: reducers,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    ...middleware,
  ],
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
  enhancers: enhancers,
});

const persistor = persistStore(store, persistConfig, () => {
  //   console.log('Test', store.getState());
});
const configureAppStore = () => {
  return { persistor, store };
};

sagaMiddleware.run(sagas);

export default configureAppStore;
