import axios from 'axios';
import {
  FETCH_POSTS,
  savePosts,
  FETCH_RANDOM_POSTS,
  saveRandomPosts,
} from 'src/actions/posts';

const postsMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_POSTS: {
      axios.get('http://localhost:8000/api/posts')
        .then((response) => {
          // console.log(response);
          store.dispatch(savePosts(response.data));
        }).catch((error) => {
          console.log(error);
        });
      break;
    }
    case FETCH_RANDOM_POSTS: {
      axios.get(('http://localhost:8000/api/random/posts'))
        .then((response) => {
          const randomPostsData = response.data;
          const randomPostsLimited = randomPostsData.slice(0, 3);
          // console.log(randomPostsLimited);
          store.dispatch(saveRandomPosts(randomPostsLimited));
        }).catch((error) => {
          console.log(error);
        });
      break;
    }
    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default postsMiddleware;
