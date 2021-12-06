import { SAVE_POSTS, SAVE_RANDOM_POSTS } from '../actions/posts';
import { UPDATE_POSTS_FILTER, CLEAR_FILTER_LOCATION } from '../actions/filterPosts';

const initialState = {
  postsList: [],
  randomPostsList: [],
  postsLoaded: false,
  randomPostsLoaded: false,
  // values for the filter fields
  sportfilter: '',
  datefilter: '',
  locationfilter: '',
};

function postsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_POSTS:
      return {
        ...state,
        postsList: action.posts,
        postsLoaded: true,
      };
    case SAVE_RANDOM_POSTS:
      return {
        ...state,
        randomPostsList: action.randomPosts,
        randomPostsLoaded: true,
      };
    case UPDATE_POSTS_FILTER:
      return {
        ...state,
        [action.name]: action.newValue,
      };
    case CLEAR_FILTER_LOCATION:
      return {
        ...state,
        locationfilter: '',
      };
    default:
      return state;
  }
}

export default postsReducer;
