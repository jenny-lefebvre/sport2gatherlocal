import { connect } from 'react-redux';
import { changeTheme } from 'src/actions/auth';
// on importe le composant de présentation
import Header from 'src/components/Header';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state
  isLogged: state.auth.isLogged,
  username: state.auth.username,
  picture: state.auth.picture,
  darkMode: state.auth.darkMode,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  handleChangeTheme: () => {
    dispatch(changeTheme());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Header);
