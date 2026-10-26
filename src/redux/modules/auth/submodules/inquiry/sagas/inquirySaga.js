import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import {
  fetchCountriesSuccess,
  fetchCountriesFailure,
  fetchInquiryOptionsSuccess,
  fetchInquiryOptionsFailure,
  submitInquirySuccess,
  submitInquiryFailure,
} from '../actions/inquiryActions';
import frontApiService from '@/api/services/front/frontApiService';

function* fetchCountriesWorkerSaga(action) {
  try {
    const response = yield call([frontApiService, frontApiService.getCountries], action.payload || {});
    yield put(fetchCountriesSuccess(response));
  } catch (error) {
    yield put(fetchCountriesFailure(error.message || 'Failed to fetch active countries'));
  }
}

function* fetchInquiryOptionsWorkerSaga(action) {
  try {
    const response = yield call([frontApiService, frontApiService.getInquiryOptions], action.payload || {});
    yield put(fetchInquiryOptionsSuccess(response));
  } catch (error) {
    yield put(fetchInquiryOptionsFailure(error.message || 'Failed to fetch inquiry options'));
  }
}

function* submitInquiryWorkerSaga(action) {
  try {
    const response = yield call([frontApiService, frontApiService.createInquiry], action.payload);
    yield put(submitInquirySuccess(response));
    if (action.callbacks?.onSuccess) {
      action.callbacks.onSuccess(response);
    }
  } catch (error) {
    yield put(submitInquiryFailure(error));
    if (action.callbacks?.onError) {
      action.callbacks.onError(error);
    }
  }
}

export function* watchInquirySaga() {
  yield takeLatest(types.FETCH_COUNTRIES_REQUEST, fetchCountriesWorkerSaga);
  yield takeLatest(types.FETCH_INQUIRY_OPTIONS_REQUEST, fetchInquiryOptionsWorkerSaga);
  yield takeLatest(types.SUBMIT_INQUIRY_REQUEST, submitInquiryWorkerSaga);
}