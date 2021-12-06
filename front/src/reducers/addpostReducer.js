import {
  UPDATE_FORMPOST_FIELD,
  CLEAR_SELECT_SPORT,
  CLEAR_FILTER_LOCATION,
  SUCCESS_ADDPOST,
} from 'src/actions/addpost';

const initialState = {
  // username field value
  title: '',
  // email field value
  description: '',
  // min participants field value
  minPeople: '',
  // max participants field value
  maxPeople: '',
  // sport field value
  sport: '',
  // date field value
  date: '',
  // location field value
  location: '',
  // level field value
  level: '',
  // is the post added ?
  isAdded: false,
};

function addpostReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_FORMPOST_FIELD:
      return {
        ...state,
        [action.name]: action.newValue,
      };
    case CLEAR_SELECT_SPORT:
      return {
        ...state,
        [action.name]: '',
      };
    case CLEAR_FILTER_LOCATION:
      return {
        ...state,
        location: '',
      };
    case SUCCESS_ADDPOST:
      return {
        ...state,
        title: '',
        description: '',
        minPeople: '',
        maxPeople: '',
        sport: '',
        date: '',
        location: '',
        level: '',
        isAdded: true,
      };
    default:
      return state;
  }
}

export default addpostReducer;
