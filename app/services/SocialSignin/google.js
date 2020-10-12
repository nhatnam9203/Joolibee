
import { GoogleSignin } from '@react-native-community/google-signin';
import Config from 'react-native-config';

GoogleSignin.configure({
    scopes: [`${Config.GOOGLE_ENDPOINT}/auth/userinfo.profile`],
    webClientId: "579642910552-ano8kp2n2lu863rbf6eq2cvs28uul02m.apps.googleusercontent.com",
    offlineAccess: false,
    forceCodeForRefreshToken: true,
    iosClientId: `${Config.IOS_CLIENT_ID}`,
});


export const loginGoogle = async () => new Promise(async (resolve, reject) => {
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        console.log('userInfo',userInfo)
        resolve(userInfo)
    } catch (error) {
        console.log('error',error)
        reject(error.code)
    }
});

export const getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    return currentUser
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

}