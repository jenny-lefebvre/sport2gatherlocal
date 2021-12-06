import { connect } from 'react-redux';

// on importe le composant de présentation
import Posts from 'src/components/Posts';

import { updatePostsFilter, clearFilterLocation } from 'src/actions/filterPosts';
import { resetPostState } from '../../actions/post';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  posts: state.posts.postsList,
  sportfilter: state.posts.sportfilter,
  datefilter: state.posts.datefilter,
  locationfilter: state.posts.locationfilter,
  isLogged: state.auth.isLogged,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  changeField: (newValue, name) => {
    dispatch(updatePostsFilter(newValue, name));
  },
  resetLocation: () => {
    dispatch(clearFilterLocation());
  },
  resetPost: () => {
    dispatch(resetPostState());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
