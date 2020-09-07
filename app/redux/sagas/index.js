import { all } from 'redux-saga/effects';

import { loginSagas } from './accountSaga';

export default function* rootSaga() {
  yield all([...loginSagas]);
}
