import { connect } from 'react-redux';

// on importe le composant de présentation
import Profile from 'src/components/Profile';
import { fetchUser } from '../../actions/profile';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state
  user: state.profile.userData,
  userDataLoaded: state.profile.userDataLoaded,
  isLogged: state.auth.isLogged,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  loadUser: () => {
    dispatch(fetchUser());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
