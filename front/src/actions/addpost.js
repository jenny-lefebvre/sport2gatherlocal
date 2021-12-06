export const UPDATE_FORMPOST_FIELD = 'UPDATE_FORMPOST_FIELD';
export const SUBMIT_ADD_POST = 'SUBMIT_ADD_POST';
export const CLEAR_SELECT_SPORT = 'CLEAR_SELECT_SPORT';
export const CLEAR_FILTER_LOCATION = 'CLEAR_FILTER_LOCATION';
export const SUCCESS_ADDPOST = 'SUCCESS_ADDPOST';

export const updateFormpostField = (newValue, name) => ({
  type: UPDATE_FORMPOST_FIELD,
  newValue: newValue,
  name: name,
});

export const submitAddPost = () => ({
  type: SUBMIT_ADD_POST,
});

export const clearSelectSport = (name) => ({
  type: CLEAR_SELECT_SPORT,
  name: name,
});

export const clearFilterLocation = () => ({
  type: CLEAR_FILTER_LOCATION,
});

export const successAddpost = () => ({
  type: SUCCESS_ADDPOST,
});
