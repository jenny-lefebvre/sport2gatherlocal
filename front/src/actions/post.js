export const PARTICIPATE_POST = 'PARTICIPATE_POST';
export const SUCCESS_PARTICIPATE = 'SUCCESS_PARTICIPATE';
export const CANCEL_PARTICIPATE_POST = 'CANCEL_PARTICIPATE_POST';
export const DISPLAY_COMMENT_INPUT = 'DISPLAY_COMMENT_INPUT';
export const UPDATE_COMMENT_FIELD = 'UPDATE_COMMENT_FIELD';
export const ADD_NEW_COMMENT = 'ADD_NEW_COMMENT';
export const UPDATE_POST_ID = 'UPDATE_POST_ID';
export const DO_NOT_PARTICIPATE = 'DO_NOT_PARTICIPATE';
export const SUCCESS_COMMENT = 'SUCCESS_COMMENT';
export const DELETE_POST = 'DELETE_POST';
export const SUCCESS_DELETE_POST = 'SUCCESS_DELETE_POST';
export const RESET_POST_STATE = 'RESET_POST_STATE';

export const participatePost = () => ({
  type: PARTICIPATE_POST,
});

export const displayCommentInput = () => ({
  type: DISPLAY_COMMENT_INPUT,
});

export const cancelParticipatePost = () => ({
  type: CANCEL_PARTICIPATE_POST,
});

export const updateCommentField = (newValue) => ({
  type: UPDATE_COMMENT_FIELD,
  newValue: newValue,
});

export const addNewComment = () => ({
  type: ADD_NEW_COMMENT,
});

export const successParticipate = () => ({
  type: SUCCESS_PARTICIPATE,
});

export const upddatePostId = (newId) => ({
  type: UPDATE_POST_ID,
  newId: newId,
});

export const doNotParticipate = () => ({
  type: DO_NOT_PARTICIPATE,
});

export const successComment = () => ({
  type: SUCCESS_COMMENT,
});

export const deletePost = () => ({
  type: DELETE_POST,
});

export const successDeletePost = () => ({
  type: SUCCESS_DELETE_POST,
});

export const resetPostState = () => ({
 type: RESET_POST_STATE,
});
