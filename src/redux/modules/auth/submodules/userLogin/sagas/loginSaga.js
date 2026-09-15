import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { loginSuccess, loginFailure } from '../actions/loginActions';
import { LoginApiService } from '../../../../../../api/services/auth/submodules/userLogin/LoginApiService';

const loginApi = new LoginApiService();

function* loginWorkerSaga(action) {
  try {
    const response = yield call([loginApi, loginApi.login], action.payload);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error.message || 'Login failed'));
  }
}

export function* watchLoginSaga() {
  yield takeLatest(types.USER_LOGIN_REQUEST, loginWorkerSaga);
}
