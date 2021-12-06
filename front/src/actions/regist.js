export const UPDATE_REGISTER_FIELD = 'UPDATE_REGISTER_FIELD';
export const SUBMIT_REGISTER = 'SUBMIT_REGISTER';
export const CLEAR_SELECT_SPORT = 'CLEAR_SELECT_SPORT';
export const SUCCESS_REGISTER = 'SUCCESS_REGISTER';

export const updateRegisterField = (newValue, name) => ({
  type: UPDATE_REGISTER_FIELD,
  newValue: newValue,
  name: name,
});

export const submitRegister = () => ({
  type: SUBMIT_REGISTER,
});

export const clearSelectSport = (name) => ({
  type: CLEAR_SELECT_SPORT,
  name: name,
});

export const successRegister = () => ({
  type: SUCCESS_REGISTER,
});
