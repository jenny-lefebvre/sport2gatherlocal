import { UPDATE_REGISTER_FIELD, CLEAR_SELECT_SPORT, SUCCESS_REGISTER } from 'src/actions/regist';

const initialState = {
  // username field value
  username: '',
  // email field value
  email: '',
  // password field value
  password: '',
  // password confirmation field value
  passwordConfirm: '',
  // Avatar select value
  selectAvatar: '',
  // bio field value
  bio: '',
  // first sport select values
  firstSportlabel: '',
  firstSportLevel: '',
  // second sport select values
  secondSportlabel: '',
  secondSportLevel: '',
  // third sport select values
  thirdSportlabel: '',
  thirdSportLevel: '',
  // location input value
  location: '',
  // is the visitor registered ?
  isRegistered: false,
};

function registReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_REGISTER_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
      };
    case CLEAR_SELECT_SPORT:
      return {
        ...state,
        [action.name]: '',
      };
    case SUCCESS_REGISTER:
      return {
        ...state,
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        selectAvatar: '',
        bio: '',
        firstSportlabel: '',
        firstSportLevel: '',
        secondSportlabel: '',
        secondSportLevel: '',
        thirdSportlabel: '',
        thirdSportLevel: '',
        location: '',
        isRegistered: true,
      };
    default:
      return state;
  }
}

export default registReducer;
