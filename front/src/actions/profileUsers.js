// === action types
export const FETCH_OTHER_USER = 'FETCH_OTHER_USER';
export const SAVE_OTHER_USER = 'SAVE_OTHER_USER';

// === action creators

export const fetchOtherUser = () => ({
  type: FETCH_OTHER_USER,
});

export const saveOtherUser = (user) => ({
  type: SAVE_OTHER_USER,
  user: user,
});
