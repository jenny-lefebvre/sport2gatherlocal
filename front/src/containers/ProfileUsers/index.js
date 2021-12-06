import { connect } from 'react-redux';

// on importe le composant de présentation
import ProfileUsers from 'src/components/ProfileUsers';
import { fetchOtherUser } from '../../actions/profileUsers';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state
  user: state.profileUsers.consultedUserData,
  userDataLoaded: state.profileUsers.consultedUserDataLoaded,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  loadUser: () => {
    dispatch(fetchOtherUser());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(ProfileUsers);
