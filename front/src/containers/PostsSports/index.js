import { connect } from 'react-redux';

// on importe le composant de présentation
import PostsSports from 'src/components/PostsSports';

import { clearFilterLocation } from 'src/actions/filterPosts';
import { fetchSports } from '../../actions/sports';
import { fetchPosts } from '../../actions/posts';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state
  sports: state.sports.sportsList,
  posts: state.posts.postsList,
  sportfilter: state.posts.sportfilter,
  datefilter: state.posts.datefilter,
  locationfilter: state.posts.locationfilter,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  loadSports: () => {
    dispatch(fetchSports());
  },
  loadPosts: () => {
    dispatch(fetchPosts());
  },
  resetLocation: () => {
    dispatch(clearFilterLocation());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(PostsSports);
