import { useEffect, useState } from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';

const FIREBASE_TOKEN_STORE_KEY = 'fcmToken';
const DEFINE_SAVE_TOKEN = false;

export const useFirebaseCloudMessing = ({
  onForegroundMessage,
  onBackgroundMessage,
  onOpenedApp,
  onInit,
  onMessageError,
}) => {
  const [token, setFirebaseToken] = useState(null);

  // get firebase token for device
  const getToken = async () => {
    let fcmToken;
    if (DEFINE_SAVE_TOKEN) {
      fcmToken = await AsyncStorage.getItem(FIREBASE_TOKEN_STORE_KEY);
      if (!fcmToken) {
        fcmToken = await messaging().getToken();
        if (fcmToken) {
          // user has a device token
          await AsyncStorage.setItem(FIREBASE_TOKEN_STORE_KEY, fcmToken);
        }
      }
    } else {
      fcmToken = await messaging().getToken();
    }

    // console.log('token = ', fcmToken);
    setFirebaseToken(fcmToken);
  };

  // request when first launch app
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();

    switch (authStatus) {
      case messaging.AuthorizationStatus.NOT_DETERMINED:
        //Permission has not yet been requested for your application.
        // if (typeof onMessageError === 'function') {
        //   onMessageError();
        // }
        break;
      case messaging.AuthorizationStatus.DENIED:
        //The user has denied notification permissions.
        // await requestUserPermission();
        // if (typeof onMessageError === 'function') {
        //   onMessageError();
        // }
        break;
      case messaging.AuthorizationStatus.AUTHORIZED:
      case messaging.AuthorizationStatus.PROVISIONAL:
      default:
        await getToken();
        break;
    }
  };

  // check permissions firebase
  const checkPermission = async () => {
    const authStatus = await messaging().hasPermission();

    switch (authStatus) {
      case messaging.AuthorizationStatus.NOT_DETERMINED:
        //Permission has not yet been requested for your application.
        await requestUserPermission();

        break;
      case messaging.AuthorizationStatus.DENIED:
        //The user has denied notification permissions.
        // await requestUserPermission();

        break;
      case messaging.AuthorizationStatus.AUTHORIZED:
      case messaging.AuthorizationStatus.PROVISIONAL:
      default:
        await getToken();
        break;
    }
  };

  // ! TODO: if not allow notify -> not need listener notification

  useEffect(() => {
    checkPermission();

    // Register background handler & Quit state messages
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      // console.log('Message handled in the background!', remoteMessage);
      if (typeof onBackgroundMessage === 'function') {
        onBackgroundMessage(remoteMessage);
      }
    });

    messaging().onMessage(async (remoteMessage) => {
      // console.log('Notification onMessage', remoteMessage);
      if (typeof onForegroundMessage === 'function') {
        onForegroundMessage(remoteMessage);
      }
    });

    messaging().onNotificationOpenedApp((remoteMessage) => {
      // console.log(
      //   'Notification caused app to open from background state:',
      //   remoteMessage.notification,
      // );
      if (typeof onOpenedApp === 'function') {
        onOpenedApp(remoteMessage);
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   'Notification caused app to open from quit state:',
          //   remoteMessage.notification,
          // );

          if (typeof onInit === 'function') {
            onInit(remoteMessage);
          }
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return token;
};
