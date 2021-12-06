import { UPDATE_SEARCHBAR_FIELD, SAVE_FILTERED_POSTS, SUBMIT_SEARCHBAR } from '../actions/searchbar';

const initialState = {
  sport: '',
  place: '',
  date: '',
  postsListFiltered: [],
  postsFilteredLoaded: false,
};

function searchbarReducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_SEARCHBAR_FIELD:
      return {
        ...state,
        // on est prêts à gérer un formulaire de 50 champs avec une seule action
        [action.name]: action.newValue,
      };
    case SAVE_FILTERED_POSTS:
      return {
        ...state,
        postsListFiltered: action.posts,
        postsFilteredLoaded: true,
      };
    case SUBMIT_SEARCHBAR:
      return {
        ...state,
        postsListFiltered: action.posts,
        sport: '',
        place: '',
        date: '',
        postsFilteredLoaded: false,
      };

    default:
      return state;
  }
}

export default searchbarReducer;
