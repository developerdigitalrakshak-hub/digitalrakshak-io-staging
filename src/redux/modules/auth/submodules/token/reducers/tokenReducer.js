import * as types from '../actions/actionTypes';

const initialState = {
  accessToken: null,
  tokenType: 'Bearer',
  expiresIn: null,
  loading: false,
  error: null,
  lastUpdated: null,
};

export default function tokenReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_TOKEN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_TOKEN_SUCCESS:
      return {
        ...state,
        loading: false,
        accessToken: action.payload.access_token || action.payload.accessToken,
        tokenType: action.payload.token_type || 'Bearer',
        expiresIn: action.payload.expires_in || 3600,
        lastUpdated: new Date().toISOString(),
        error: null,
      };
    case types.FETCH_TOKEN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CLEAR_TOKEN:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
