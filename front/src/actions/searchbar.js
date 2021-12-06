// === action types
export const UPDATE_SEARCHBAR_FIELD = 'UPDATE_SEARCHBAR_FIELD';
export const SUBMIT_SEARCHBAR = 'SUBMIT_SEARCHBAR';
export const SAVE_FILTERED_POSTS = 'SAVE_FILTERED_POSTS';

// === action creators

export const updateSearchbarField = (newValue, name) => ({
  type: UPDATE_SEARCHBAR_FIELD,
  newValue: newValue,
  name: name,
});

export const submitSearchbar = () => ({
  type: SUBMIT_SEARCHBAR,
});

export const saveFilteredPosts = (posts) => ({
  type: SAVE_FILTERED_POSTS,
  posts: posts,
});
