/**
 * React Native App
 * Everything starts from the entrypoint
 */
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import {
  DefaultTheme,
  Provider as PaperProvider,
  configureFonts,
} from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import { setI18nConfig } from '@localize';
import { AppStyles } from '@theme';
import { ApolloProvider } from 'react-apollo';
import makeApolloClient from './apolloClient';

import Navigator from 'app/navigation';
import configureAppStore from 'app/redux/store';

const { persistor, store } = configureAppStore();
const apolloClient = makeApolloClient();

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'Roboto-Medium',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'Roboto-Light',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'Roboto-Thin',
      fontWeight: 'normal',
    },
  },
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...AppStyles.colors,
  },
  fonts: configureFonts(fontConfig),
};

enableScreens();
setI18nConfig('vi'); // set initial config

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <PaperProvider theme={theme}>
            <Navigator />
          </PaperProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
