import { connect } from 'react-redux';

import {
  toggleSettingsOpen,
  updateLoginField,
  submitLogin,
  submitLogout,
} from 'src/actions/auth';

// on importe le composant de présentation
import Login from 'src/components/Login';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  // nom de la prop à remplir: élément à récupérer dans le state
  isOpen: state.auth.isSettingsOpen,
  email: state.auth.email,
  password: state.auth.password,
  isLogged: state.auth.isLogged,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  // nom de la prop à remplir: fonction qui dispatch l'action
  toggleOpen: () => {
    dispatch(toggleSettingsOpen());
  },
  changeField: (newValue, name) => {
    // console.log(`newValue=${newValue}, name=${name}`);
    const action = updateLoginField(newValue, name);
    dispatch(action);
  },
  handleLogin: () => {
    dispatch(submitLogin());
  },
  deconnect: () => {
    dispatch(submitLogout());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Login);
