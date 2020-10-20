/**
 * React Native App
 * Everything starts from the entry point
 */
import { ApolloProvider } from '@apollo/client';
import { Loading } from '@components';
import { useChangeLanguage, useCodePushUpdate } from '@hooks';
import { setI18nConfig } from '@localize';
import { hideLoading } from '@slices/app';
import { AppStyles } from '@theme';
import Navigator from 'app/navigation';
import configureAppStore from 'app/redux/store';
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
import { dropdownRef } from './navigation/NavigationService';
import { graphQlClient } from './graphql';

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
    <ApolloProvider client={graphQlClient}>
      <StoreProvider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <LangProvider>
            <PaperProvider theme={theme}>
              <Navigator />
              <LoadingProvider />
              <DropdownAlert
                ref={dropdownRef}
                showCancel={true}
                closeInterval={6000}
              />
            </PaperProvider>
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
    const action = hideLoading();
    dispatch(action);
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
