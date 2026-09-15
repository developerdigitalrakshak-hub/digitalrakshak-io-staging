import { call, put, takeLatest } from 'redux-saga/effects';
import * as types from '../actions/actionTypes';
import { fetchPostsSuccess, fetchPostsFailure } from '../actions/postsActions';
import postsApiService from '../../../../api/services/posts/PostsApiService';

function* fetchPostsWorkerSaga(action) {
  try {
    const posts = yield call([postsApiService, postsApiService.getPosts], action.payload);
    yield put(fetchPostsSuccess(posts));
  } catch (error) {
    yield put(fetchPostsFailure(error.message || 'Failed to fetch posts via Axios API Service'));
  }
}

export function* watchPostsSaga() {
  yield takeLatest(types.FETCH_POSTS_REQUEST, fetchPostsWorkerSaga);
}
