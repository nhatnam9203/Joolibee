import { put, call, fork, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { Alert } from 'react-native';
import { takeEvery } from 'redux-saga/effects';

export function* loginAsync(action) {
  //   yield put(loginActions.enableLoader());
  //how to call api
  //const response = yield call(loginUser, action.username, action.password);
  //mock response
  //   const response = { success: true, data: { id: 1 } };
  //   if (response.success) {
  //     yield put(loginActions.onLoginResponse(response.data));
  //     yield put(loginActions.disableLoader({}));
  //     // no need to call navigate as this is handled by redux store with SwitchNavigator
  //     //yield call(navigationActions.navigateToHome);
  //   } else {
  //     yield put(loginActions.loginFailed());
  //     yield put(loginActions.disableLoader({}));
  //     setTimeout(() => {
  //       Alert.alert('BoilerPlate', response.Message);
  //     }, 200);
  //   }
}

export const loginSagas = [takeEvery('login', loginAsync)];
