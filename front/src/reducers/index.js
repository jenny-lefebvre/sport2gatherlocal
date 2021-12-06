import { combineReducers } from 'redux';

// import all reducers
import authReducer from './authReducer';
import registReducer from './registReducer';
import addpostReducer from './addpostReducer';
import searchbarReducer from './searchbarReducer';
import profileReducer from './profileReducer';
import sportsReducer from './sportsReducer';
import postReducer from './postReducer';
import postsReducer from './postsReducer';
import profileUsersReducer from './profileUsersReducer';

// etc

// main reducer
const rootReducer = combineReducers({
  auth: authReducer,
  regist: registReducer,
  addpost: addpostReducer,
  searchbar: searchbarReducer,
  sports: sportsReducer,
  post: postReducer,
  posts: postsReducer,
  profile: profileReducer,
  profileUsers: profileUsersReducer,

  // etc
});

export default rootReducer;
