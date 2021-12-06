// === action types
export const TOGGLE_SETTINGS_OPEN = 'TOGGLE_SETTINGS_OPEN';
export const UPDATE_LOGIN_FIELD = 'UPDATE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const SUBMIT_LOGOUT = 'SUBMIT_LOGOUT';
export const CHANGE_THEME = 'CHANGE_THEME';

// manage success login
export const CONNECT_USER = 'CONNECT_USER';
export const KEEP_LOGIN = 'KEEP_LOGIN';

// === action creators

export const toggleSettingsOpen = () => ({
  type: TOGGLE_SETTINGS_OPEN,
});

export const updateLoginField = (newValue, name) => ({
  type: UPDATE_LOGIN_FIELD,
  newValue: newValue,
  name: name,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const submitLogout = () => ({
  type: SUBMIT_LOGOUT,
});

export const connectUser = (token, id, picture, username) => ({
  type: CONNECT_USER,
  token: token,
  id: id,
  picture: picture,
  username: username,
});

export const keepLogin = () => ({
  type: KEEP_LOGIN,
});

export const changeTheme = () => ({
  type: CHANGE_THEME,
});
