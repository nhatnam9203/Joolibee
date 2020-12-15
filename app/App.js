/**
 * React Native App
 * Everything starts from the entry point
 */
import { ApolloProvider } from '@apollo/client';
import { Loading, RootPermission, CustomPopupConfirm } from '@components';
import { useChangeLanguage } from '@hooks';
import { setI18nConfig } from '@localize';
import { app } from '@slices';
import { AppStyles } from '@theme';
import Navigator from 'app/navigation';
import { persistor, store } from 'app/redux/store';
import React from 'react';
import { ActivityIndicator, LogBox } from 'react-native';
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
import {
  dropdownRef,
  graphQLErrorRef,
  confirmRef,
  comingSoonRef,
} from './navigation/NavigationService';
import { useGraphQLClient } from '@graphql';
import { ConfirmHandler, ComingSoonHandler } from './handlers';
import { useFirebaseCloudMessing } from '@firebase';
import PushNotification from 'react-native-push-notification';
import { GEX } from '@graphql';
import { order } from '@slices';

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

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'));
}

const App = () => {
  const graphQlClient = useGraphQLClient();
  // Sync CodePush here !!

  React.useEffect(() => {
    SplashScreen.hide();
  }, []);

  if (!graphQlClient) {
    return <Loading />;
  }

  return (
    <ApolloProvider client={graphQlClient}>
      <StoreProvider store={store}>
        <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
          <LangProvider>
            <GraphErrorHandler ref={graphQLErrorRef}>
              <PaperProvider theme={theme}>
                <NotificationProvider>
                  <Navigator />
                  <LoadingProvider />
                  <RootPermission />
                  <DropdownAlert
                    ref={dropdownRef}
                    showCancel={true}
                    closeInterval={6000}
                  />
                  <ConfirmHandler ref={confirmRef} />
                  <ComingSoonHandler ref={comingSoonRef} />
                </NotificationProvider>
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

const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [, getOrderList] = GEX.useOrderList();

  const onForegroundMessage = (data) => {
    // Logger.debug('onForegroundMessage', data);

    /**
     * TRƯỜNG HỢP APP DANG ACTIVE
     * - cập nhật trạng thái đơn hàng, field: status, get nhanh server cache -> nen can update redux
     * - cập nhật lại notify của app
     */
    if (data?.data?.order) {
      const { status, order_number, title, content } = JSON.parse(
        data?.data?.order,
      );
      dispatch(order.updateOrderStatus({ status, order_number }));

      PushNotification.localNotification({
        // smallIcon: 'ic_merchant',
        // largeIcon: 'ic_merchant',
        title: title ?? '',
        message: content ?? '',
      });
    }
  };
  const onBackgroundMessage = (data) => {
    // Logger.debug('onBackgroundMessage', data);
    /**
     * TRƯỜNG HỢP APP IN BACKGROUND (ACTIVE & INACTIVE)
     *
     *
     */
  };

  const onOpenedApp = (data) => {
    // Logger.debug('onOpenedApp', data);
    /**
     * TRƯỜNG HỢP APP IN OPENING
     * - sau khi mở nhảy vào order list
     *
     */
    getOrderList();
  };

  const onInit = (data) => {
    // Logger.debug('onInit', data);
  };
  const onMessageError = (data) => {
    // Logger.debug('onMessageError', data);
  };

  const token = useFirebaseCloudMessing({
    onForegroundMessage,
    onBackgroundMessage,
    onOpenedApp,
    onInit,
    onMessageError,
  });

  React.useEffect(() => {
    dispatch(app.updateFcmToken(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return <>{children}</>;
};

export default App;
