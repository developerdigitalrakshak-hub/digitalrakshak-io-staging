import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from './storage';

import postsReducer from './modules/posts/reducers/postsReducer';
import loginReducer from './modules/auth/submodules/userLogin/reducers/loginReducer';
import tokenReducer from './modules/auth/submodules/token/reducers/tokenReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['posts', 'auth'],
};

const authReducer = combineReducers({
  userLogin: loginReducer,
  token: tokenReducer,
});

const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
});


export const persistedReducer = persistReducer(persistConfig, rootReducer);
export default rootReducer;
