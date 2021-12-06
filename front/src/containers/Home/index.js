import { connect } from 'react-redux';

// on importe le composant de présentation
import Home from 'src/components/Home';
import { resetPostState } from '../../actions/post';

// === mapStateToProps
const mapStateToProps = (state) => ({
  randomPostsList: state.posts.randomPostsList,
  randomSportsList: state.sports.randomSportsList,
  isLogged: state.auth.isLogged,
});

// === mapDispatchToProps
const mapDispatchToProps = (dispatch) => ({
  resetPost: () => {
    dispatch(resetPostState());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Home);
