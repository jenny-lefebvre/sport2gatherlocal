import { SAVE_USER } from '../actions/profile';

const initialState = {
  // ici l'état initial
  userData: [],
  userDataLoaded: false,
};

function profileReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        userData: action.user,
        userDataLoaded: true,
      };
    default:
      return state;
  }
}

export default profileReducer;
