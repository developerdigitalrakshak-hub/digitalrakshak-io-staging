import * as types from './actionTypes';

export const fetchTokenRequest = (options = {}) => ({
  type: types.FETCH_TOKEN_REQUEST,
  payload: options,
});

export const fetchTokenSuccess = (data) => ({
  type: types.FETCH_TOKEN_SUCCESS,
  payload: data,
});

export const fetchTokenFailure = (error) => ({
  type: types.FETCH_TOKEN_FAILURE,
  payload: error,
});

export const clearToken = () => ({
  type: types.CLEAR_TOKEN,
});
