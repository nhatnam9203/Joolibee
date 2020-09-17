/**
 * React Native App
 * Everything starts from the entry point
 */
import { setI18nConfig } from '@localize';
import { AppStyles } from '@theme';
import Navigator from 'app/navigation';
import configureAppStore from 'app/redux/store';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ActivityIndicator } from 'react-native';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import {
  Provider as StoreProvider,
  useSelector,
  useDispatch,
} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { graphQlClient } from './graphql';
import { Loading } from '@components';
import { hideLoading } from '@slices/app';

const { persistor, store } = configureAppStore();

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
    merge: {
      fontFamily: 'Merge',
      fontWeight: 'bold',
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
// set initial config
setI18nConfig('vi');

export default function App() {
  // React.useEffect(() => {}, []);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ApolloProvider client={graphQlClient}>
          <PaperProvider theme={theme}>
            <Navigator />
            <LoadingProvider />
          </PaperProvider>
        </ApolloProvider>
      </PersistGate>
    </StoreProvider>
  );
}

const LoadingProvider = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.app.loading);

  const onCancelLoading = React.useCallback(() => {
    const action = hideLoading();
    dispatch(action);
  }, [dispatch]);

  return <Loading isLoading={isLoading} onCancelLoading={onCancelLoading} />;
};
