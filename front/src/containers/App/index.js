import { connect } from 'react-redux';

import App from 'src/components/App';

import { keepLogin } from 'src/actions/auth';
import { fetchPosts, fetchRandomPosts } from '../../actions/posts';
import { fetchCategories, fetchSports, fetchRandomSports } from '../../actions/sports';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  token: state.auth.token,
  isLogged: state.auth.isLogged,
  postsLoaded: state.posts.postsLoaded,
  categoriesLoaded: state.sports.categoriesLoaded,
  sportsLoaded: state.sports.sportsLoaded,
  isAdded: state.addpost.isAdded,
  participate: state.post.participate,
  displayCommentInput: state.post.displayCommentInput,
  randomPostsLoaded: state.posts.randomPostsLoaded,
  randomSportsLoaded: state.sports.randomSportsLoaded,
  darkMode: state.auth.darkMode,
  isDeleted: state.post.isDeleted,
  reloadPosts: state.post.reloadPosts,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  keepConnexion: () => {
    dispatch(keepLogin());
  },
  loadPosts: () => {
    dispatch(fetchPosts());
  },
  loadCategories: () => {
    dispatch(fetchCategories());
  },
  loadSports: () => {
    dispatch(fetchSports());
  },
  loadRandomPosts: () => {
    dispatch(fetchRandomPosts());
  },
  loadRandomSports: () => {
    dispatch(fetchRandomSports());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(App);
