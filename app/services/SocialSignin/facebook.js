import { Platform } from 'react-native';
import {
  LoginManager,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';

const checkPermissionFb = async () => {
  try {
    if (Platform.OS === 'android') {
      LoginManager.setLoginBehavior('web_only');
    }
    let permission = await LoginManager.logInWithPermissions([
      'public_profile',
    ]);
    if (!permission.isCancelled) {
      return permission.grantedPermissions.toString();
    } else return;
  } catch (error) {
    return error;
  }
};

const requestApi = (accessToken, responseInfoCallback) => {
  try {
    const request = new GraphRequest(
      '/me',
      {
        accessToken: accessToken,
        parameters: {
          fields: {
            string: 'email,name,first_name,last_name,picture.type(large)',
          },
        },
      },
      responseInfoCallback,
    );
    new GraphRequestManager().addRequest(request).start(1000);
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert('Login facebook with error :' + error.message);
  }
};

export const loginFb = async () =>
  new Promise(async (resolve, reject) => {
    // const responseInfoCallback = (error, result) => {
    //   if (error) {
    //     // reject(error);
    //   } else {
    //     console.log(result);
    //     // resolve(result);
    //   }
    // };
    try {
      let result = await checkPermissionFb();
      if (result === 'public_profile') {
        let data = await AccessToken.getCurrentAccessToken();
        resolve(data);
      }
    } catch (error) {
      reject(error);
    }
  });

export const logoutFb = () => {
  AccessToken.getCurrentAccessToken()
    .then((data) => {})
    .then(() => {
      LoginManager.logOut();
    })
    .catch((error) => {
      // console.log(error)
    });
};
