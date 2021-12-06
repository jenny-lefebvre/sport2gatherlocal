export const UPDATE_POSTS_FILTER = 'UPDATE_POSTS_FILTER';
export const CLEAR_FILTER_LOCATION = 'CLEAR_FILTER_LOCATION';

export const updatePostsFilter = (newValue, name) => ({
  type: UPDATE_POSTS_FILTER,
  newValue: newValue,
  name: name,
});

export const clearFilterLocation = () => ({
  type: CLEAR_FILTER_LOCATION,
});
