import { GoogleSignin } from '@react-native-community/google-signin';
import Config from 'react-native-config';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId: Config.WEB_CLIENT_ID + '',
  forceCodeForRefreshToken: true,
  offlineAccess: true,
  iosClientId: Config.IOS_CLIENT_ID + '',
});

export const loginGoogle = async () =>
  new Promise(async (resolve, reject) => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      resolve(userInfo);
    } catch (error) {
      reject(error.code);
    }
  });

export const getCurrentUser = async () => {
  const currentUser = await GoogleSignin.getCurrentUser();
  return currentUser;
};

export const logoutGoogle = async () => {
  let current_user = await getCurrentUser();
  if (current_user) {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      //console.error(error);
    }
  }
};
