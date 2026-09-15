import * as types from './actionTypes';

export const loginRequest = (credentials) => ({
  type: types.USER_LOGIN_REQUEST,
  payload: credentials,
});

export const loginSuccess = (data) => ({
  type: types.USER_LOGIN_SUCCESS,
  payload: data,
});

export const loginFailure = (error) => ({
  type: types.USER_LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: types.USER_LOGOUT,
});
