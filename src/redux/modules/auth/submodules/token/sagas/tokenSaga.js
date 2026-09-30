import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { fetchTokenSuccess, fetchTokenFailure } from '../actions/tokenActions';
import tokenApiService from '@/api/services/auth/tokenApiService';


function* fetchTokenWorkerSaga(action) {
  try {
    const response = yield call([tokenApiService, tokenApiService.generateToken], action.payload || {});
    yield put(fetchTokenSuccess(response));
  } catch (error) {
    yield put(fetchTokenFailure(error.message || error.error || 'Failed to generate OAuth token'));
  }
}

export function* watchTokenSaga() {
  yield takeLatest(types.FETCH_TOKEN_REQUEST, fetchTokenWorkerSaga);
}
