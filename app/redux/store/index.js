import AsyncStorage from '@react-native-community/async-storage';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import Config from 'react-native-config';
import { combineReducers } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import rootReducers from '../slices'; // where reducers is a object of reducers

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['app'],
  debug: Config.NODE_ENV !== 'production', //to get useful logging
};
const initialState = {};
const middleware = [];
const reducers = combineReducers(rootReducers);

const persistedReducer = persistReducer(config, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    ...middleware,
  ],
  preloadedState: initialState,
  devTools: Config.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export default { store, persistor };
