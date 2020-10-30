/**
 * React Native App
 * Everything starts from the entry point
 */
import { ApolloProvider } from '@apollo/client';
import { Loading, RootPermission } from '@components';
import { useChangeLanguage } from '@hooks';
import { setI18nConfig } from '@localize';
import { app } from '@slices';
import { AppStyles } from '@theme';
import Navigator from 'app/navigation';
import { persistor, store } from 'app/redux/store';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import codePush from 'react-native-code-push';
import DropdownAlert from 'react-native-dropdownalert';
import {
  configureFonts,
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import { enableScreens } from 'react-native-screens';
import SplashScreen from 'react-native-splash-screen';
import {
  Provider as StoreProvider,
  useDispatch,
  useSelector,
} from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import GraphErrorHandler from './GraphErrorHandler';
import { graphQlClient, cache } from './graphql';
import { dropdownRef, graphQLErrorRef } from './navigation/NavigationService';
import { persistCache } from 'apollo3-cache-persist';
import AsyncStorage from '@react-native-community/async-storage';

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

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
};

let App = () => {
  const [client, setClient] = React.useState(null);

  React.useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
      //trigger: 'background',
      debug: true
    }).then(() => {
      setClient(graphQlClient(cache));
    });
  }, []);

  React.useEffect(() => {
    SplashScreen.hide();
  }, [client]);

  if (!client) {
    return <></>;
  }

  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <LangProvider>
            <GraphErrorHandler ref={graphQLErrorRef}>
              <PaperProvider theme={theme}>
                <Navigator />
                <LoadingProvider />
                <RootPermission />
                <DropdownAlert
                  ref={dropdownRef}
                  showCancel={true}
                  closeInterval={6000}
                />
              </PaperProvider>
            </GraphErrorHandler>
          </LangProvider>
        </PersistGate>
      </StoreProvider>
    </ApolloProvider>
  );
};

/**Loading Provider */
const LoadingProvider = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.app.loading);

  const onCancelLoading = React.useCallback(() => {
    dispatch(app.hideLoading());
  }, [dispatch]);

  return <Loading isLoading={isLoading} onCancelLoading={onCancelLoading} />;
};

/**Language Provider */
const LangProvider = ({ children }) => {
  const [language] = useChangeLanguage();

  const reloadLanguage = React.useCallback(() => {
    setI18nConfig(language);
  }, [language]);

  reloadLanguage();

  // React.useEffect(() => {
  //   function handleLocalizationChange() {
  //     console.log(RNLocalize.getLocales());
  //     reloadLanguage();
  //   }

  //   RNLocalize.addEventListener('change', handleLocalizationChange);
  //   // …later (ex: component unmount)
  //   return RNLocalize.removeEventListener('change', handleLocalizationChange);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return <>{children}</>;
};

App = codePush(codePushOptions)(App);
export default App;
