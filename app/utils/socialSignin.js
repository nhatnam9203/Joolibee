import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";

export const checkPermissionFb = async () => {
    try {
        let permission = await LoginManager.logInWithPermissions(["public_profile"]);
        if (!permission.isCancelled) {
            return permission.grantedPermissions.toString()
        }
        else return
    } catch (error) {
        return error
    }
}

export const loginFb = async () => new Promise(async (resolve, reject) => {
    let result = await checkPermissionFb();
    const responseInfoCallback = (error, result) => {
        if (error) {
            reject(error)
        } else {
            resolve(result)
        }
    };

    if (result == 'public_profile') {
        try {
            let data = await AccessToken.getCurrentAccessToken();
            const request = new GraphRequest(
                '/me',
                {
                    accessToken: data.accessToken,
                    parameters: {
                        fields: {
                            string: 'email,name,first_name,last_name,picture.type(large)'
                        }
                    }
                },
                responseInfoCallback
            );

            new GraphRequestManager().addRequest(request).start(1000);

        } catch (error) {
            alert('Login facebook with error :' + error.message)
        }
    }
});