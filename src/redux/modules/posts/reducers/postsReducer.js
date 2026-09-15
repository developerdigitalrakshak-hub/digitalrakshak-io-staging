import * as types from '../actions/actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
  lastFetchedAt: null,
};

export default function postsReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
        lastFetchedAt: new Date().toISOString(),
        error: null,
      };
    case types.FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case types.CLEAR_POSTS:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
