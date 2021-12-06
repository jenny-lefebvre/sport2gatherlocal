import { SAVE_SPORTS, SAVE_CATEGORIES, SAVE_RANDOM_SPORTS } from 'src/actions/sports';

const initialState = {
  sportsList: [],
  randomSportsList: [],
  categoriesList: [],
  sportsLoaded: false,
  randomSportsLoaded: false,
  categoriesLoaded: false,
};

function sportsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_SPORTS:
      return {
        ...state,
        sportsList: action.sports,
        sportsLoaded: true,
      };

    case SAVE_CATEGORIES:
      return {
        ...state,
        categoriesList: action.categories,
        categoriesLoaded: true,
      };
    case SAVE_RANDOM_SPORTS:
      return {
        ...state,
        randomSportsList: action.randomSports,
        randomSportsLoaded: true,
      };
    default:
      return state;
  }
}

export default sportsReducer;
