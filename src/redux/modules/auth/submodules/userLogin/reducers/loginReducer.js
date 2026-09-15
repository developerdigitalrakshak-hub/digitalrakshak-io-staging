import * as types from '../actions/actionTypes';

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        error: null,
      };
    case types.USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.USER_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
