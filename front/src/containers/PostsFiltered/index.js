import { connect } from 'react-redux';

import { submitSearchbar } from 'src/actions/searchbar';
import { updatePostsFilter, clearFilterLocation } from 'src/actions/filterPosts';

// on importe le composant de présentation
import PostsFiltered from 'src/components/PostsFiltered';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state
  posts: state.searchbar.postsListFiltered,
  postsFilteredLoaded: state.searchbar.postsFilteredLoaded,
  sportfilter: state.posts.sportfilter,
  datefilter: state.posts.datefilter,
  locationfilter: state.posts.locationfilter,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  loadPostsFiltered: () => {
    dispatch(submitSearchbar());
  },
  changeField: (newValue, name) => {
    dispatch(updatePostsFilter(newValue, name));
  },
  resetLocation: () => {
    dispatch(clearFilterLocation());
  },

});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(PostsFiltered);
