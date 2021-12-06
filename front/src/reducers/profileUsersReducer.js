import { SAVE_OTHER_USER } from '../actions/profileUsers';

const initialState = {
  // ici l'état initial
  consultedUserData: [],
  consultedUserDataLoaded: false,
};

function profileUsersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SAVE_OTHER_USER:
      return {
        ...state,
        consultedUserData: action.user,
        consultedUserDataLoaded: true,
      };
    default:
      return state;
  }
}

export default profileUsersReducer;
