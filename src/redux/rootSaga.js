import { all, fork } from 'redux-saga/effects';
import { watchPostsSaga } from './modules/posts/sagas/postsSaga';
import { watchLoginSaga } from './modules/auth/submodules/userLogin/sagas/loginSaga';
import { watchTokenSaga } from './modules/auth/submodules/token/sagas/tokenSaga';

export default function* rootSaga() {
  yield all([
    fork(watchPostsSaga),
    fork(watchLoginSaga),
    fork(watchTokenSaga),
  ]);
}

