import {
  TOGGLE_SETTINGS_OPEN,
  UPDATE_LOGIN_FIELD,
  CONNECT_USER,
  KEEP_LOGIN,
  SUBMIT_LOGOUT,
  CHANGE_THEME,
} from 'src/actions/auth';

const initialState = {
  // indique si Settings est ouvert
  isSettingsOpen: false,
  // valeur du champ email
  email: '',
  // valeur du champ password
  password: '',
  // connexion status
  isLogged: false,
  // data receive from API when sucessfull login
  token: null,
  id: null,
  picture: null,
  username: null,
  // is the dark mode active
  darkMode: false,
};

function authReducer(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_THEME:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case UPDATE_LOGIN_FIELD:
      return {
        ...state,
        // on est prêts à gérer un formulaire de 50 champs avec une seule action
        [action.name]: action.newValue,
      };
    case TOGGLE_SETTINGS_OPEN:
      return {
        ...state,
        // on inverse la valeur
        isSettingsOpen: !state.isSettingsOpen,
      };
    case CONNECT_USER:
      return {
        ...state,
        isLogged: true,
        token: action.token,
        id: action.id,
        picture: action.picture,
        username: action.username,
        isSettingsOpen: false,
      };
    case KEEP_LOGIN:
      return {
        ...state,
        isLogged: true,
        token: localStorage.getItem('token'),
        id: localStorage.getItem('id'),
        picture: localStorage.getItem('picture'),
        username: localStorage.getItem('username'),
      };
    case SUBMIT_LOGOUT:
      return {
        ...state,
        isLogged: false,
        token: null,
      };
    default:
      return state;
  }
}

export default authReducer;
