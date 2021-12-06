import {
  SUCCESS_PARTICIPATE,
  DISPLAY_COMMENT_INPUT,
  UPDATE_COMMENT_FIELD,
  // ADD_NEW_COMMENT,
  SUCCESS_COMMENT,
  UPDATE_POST_ID,
  DO_NOT_PARTICIPATE,
  SUCCESS_DELETE_POST,
  RESET_POST_STATE,
} from 'src/actions/post';

const initialState = {
  id: null,
  participate: false,
  displayCommentInput: false,
  newComment: '',
  isDeleted: false,
  reloadPosts: false,
};

function postReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SUCCESS_PARTICIPATE:
      return {
        ...state,
        participate: true,
      };
    case DO_NOT_PARTICIPATE:
      return {
        ...state,
        participate: false,
      };
    case DISPLAY_COMMENT_INPUT:
      return {
        ...state,
        displayCommentInput: !state.displayCommentInput,
      };
    case UPDATE_COMMENT_FIELD:
      return {
        ...state,
        newComment: action.newValue,
      };
    case SUCCESS_COMMENT:
      return {
        ...state,
        newComment: '',
        displayCommentInput: false,
      };
    case UPDATE_POST_ID:
      return {
        ...state,
        id: action.newId,
      };
    case SUCCESS_DELETE_POST:
      return {
        ...state,
        isDeleted: true,
      };
    case RESET_POST_STATE:
      return {
        ...state,
        isDeleted: false,
        reloadPosts: !state.reloadPosts,
      };
    default:
      return state;
  }
}

export default postReducer;
