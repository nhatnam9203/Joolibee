/**
 * React Native App
 * Everything starts from the entry point
 */
import { setI18nConfig, RNLocalize } from '@localize';
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
import SplashScreen from 'react-native-splash-screen';
import { useCodePushUpdate, useChangeLanguage } from '@hooks';
import codePush from 'react-native-code-push';

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

let codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
  installMode: codePush.InstallMode.IMMEDIATE,
};

let App = () => {
  const [progress] = useCodePushUpdate();

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  React.useEffect(() => {
    Logger.info(progress, 'App -> check progress');
  }, [progress]);

  return (
    <StoreProvider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <ApolloProvider client={graphQlClient}>
          <LangProvider>
            <PaperProvider theme={theme}>
              <Navigator />
              <LoadingProvider />
            </PaperProvider>
          </LangProvider>
        </ApolloProvider>
      </PersistGate>
    </StoreProvider>
  );
};

const LoadingProvider = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.app.loading);

  const onCancelLoading = React.useCallback(() => {
    const action = hideLoading();
    dispatch(action);
  }, [dispatch]);

  return <Loading isLoading={isLoading} onCancelLoading={onCancelLoading} />;
};

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
