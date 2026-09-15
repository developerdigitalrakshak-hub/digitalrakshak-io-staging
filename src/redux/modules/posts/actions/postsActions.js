import * as types from './actionTypes';

export const fetchPostsRequest = (payload = {}) => ({
  type: types.FETCH_POSTS_REQUEST,
  payload,
});

export const fetchPostsSuccess = (posts) => ({
  type: types.FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: types.FETCH_POSTS_FAILURE,
  payload: error,
});

export const clearPosts = () => ({
  type: types.CLEAR_POSTS,
});
