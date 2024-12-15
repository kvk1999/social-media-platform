// src/redux/reducers/index.js
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import postReducer from './postReducer';
import storyReducer from './storyReducer';
import friendReducer from './friendReducer';

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  posts: postReducer,
  stories: storyReducer,
  friends: friendReducer,
});

export default rootReducer;
