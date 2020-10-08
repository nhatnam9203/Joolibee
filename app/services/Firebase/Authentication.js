import { useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';

import _ from 'lodash';

export const useFirebaseAuthentication = ({ verifyCallback }) => {
  const [user, setUser] = useState(null);
  const [verificationId, setVerificationId] = useState(null);
  const [initializing, setInitializing] = useState(true);

  const signInWithPhoneNumber = async (phoneNumber) => {
    // console.log('=======> call firebase verify code');
    return new Promise((resolve, reject) =>
      auth()
        .verifyPhoneNumber(phoneNumber)
        .on('state_changed', async (phoneAuthSnapshot) => {
          Logger.log(
            phoneAuthSnapshot,
            'signInWithPhoneNumber -> phoneAuthSnapshot',
          );

          switch (phoneAuthSnapshot.state) {
            case auth.PhoneAuthState.AUTO_VERIFIED:
              await setVerificationId(phoneAuthSnapshot.verificationId);
              await confirmCode(
                phoneAuthSnapshot.code,
                phoneAuthSnapshot.verificationId,
              );
              resolve(phoneAuthSnapshot);

              break;
            case auth.PhoneAuthState.CODE_SENT:
              await setVerificationId(phoneAuthSnapshot.verificationId);
              resolve(phoneAuthSnapshot);

              break;
            case auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT:
              await setVerificationId(phoneAuthSnapshot.verificationId);
              resolve(phoneAuthSnapshot);

              break;
            case auth.PhoneAuthState.ERROR:
              console.log(phoneAuthSnapshot.error.code);
              if (phoneAuthSnapshot.error) {
                showMessageErrorByCode(phoneAuthSnapshot.error.code);
              }

              reject(phoneAuthSnapshot);
              break;

            default:
              break;
          }
        }),
    );
  };

  const confirmCode = async (code, id) => {
    let confirmId = id || verificationId;

    try {
      const credential = await auth.PhoneAuthProvider.credential(
        confirmId,
        code,
      );

      const result = await authenticate(credential);
      verifyCallback({ message: 'Verified', data: result, status: 1 });
    } catch (e) {
      if (!_.isEmpty(e)) {
        showMessageErrorByCode(e?.error?.code);
      } else {
        verifyCallback({ message: 'Confirm Code Error Unknown', status: 0 });
      }
    }
  };

  const showMessageErrorByCode = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-phone-number':
        verifyCallback({
          message: 'Please enter valid phone number',
          status: 0,
        });

        break;
      case 'auth/unknown': {
        verifyCallback({ message: 'User blocked by firebase', status: 0 });

        break;
      }

      case 'auth/session-expired': {
        verifyCallback({ message: 'SMS code has expired', status: 0 });
        break;
      }
      case 'auth/invalid-verification-code': {
        verifyCallback({ message: 'Code verification not correct', status: 0 });

        break;
      }
      default:
        verifyCallback({ message: 'other error', status: 0 });
        break;
    }
  };

  const authenticate = async (credential) => {
    return await auth().signInWithCredential(credential);
  };

  const signOut = async () => {
    if (user) {
      await auth().signOut();
      setUser(null);
      setVerificationId(null);
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
      if (initializing) {
        setInitializing(false);
      } else if (authUser) {
        // phone verified
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    confirmCode,
    signInWithPhoneNumber,
    signOut,
  };
};
