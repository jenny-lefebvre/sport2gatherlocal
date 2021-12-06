// === action types
export const FETCH_USER = 'FETCH_USER';
export const SAVE_USER = 'SAVE_USER';

// === action creators

export const fetchUser = () => ({
  type: FETCH_USER,
});

export const saveUser = (user) => ({
  type: SAVE_USER,
  user: user,
});
