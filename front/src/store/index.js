import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from 'src/reducers';

import SportsMiddleware from '../middlewares/sportsMiddleware';
import authMiddleware from '../middlewares/authMiddleware';
import postsMiddleware from '../middlewares/postsMiddleware';
import searchbarMiddleware from '../middlewares/searchbarMiddleware';
import registMiddleware from '../middlewares/registMiddleware';
import profileMiddleware from '../middlewares/profileMiddleware';
import addpostMiddleware from '../middlewares/addpostMiddleware';
import postMiddleware from '../middlewares/postMiddleware';
import profileUsersMiddleware from '../middlewares/profileUsersMiddleware';

// on combine devTools avec les middlewares
const enhancers = composeWithDevTools(
  applyMiddleware(
    // ... d'autres middlewares
    SportsMiddleware,
    authMiddleware,
    postsMiddleware,
    searchbarMiddleware,
    registMiddleware,
    profileMiddleware,
    addpostMiddleware,
    postMiddleware,
    profileUsersMiddleware,
  ),
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers,
);

export default store;
