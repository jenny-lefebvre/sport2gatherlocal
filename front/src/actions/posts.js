export const FETCH_POSTS = 'FETCH_POSTS';
export const SAVE_POSTS = 'SAVE_POSTS';
export const FETCH_RANDOM_POSTS = 'FETCH_RANDOM_POSTS';
export const SAVE_RANDOM_POSTS = 'SAVE_RANDOM_POSTS';

export const fetchPosts = () => ({
  type: FETCH_POSTS,
});

export const savePosts = (posts) => ({
  type: SAVE_POSTS,
  posts: posts,
});

export const fetchRandomPosts = () => ({
  type: FETCH_RANDOM_POSTS,
});

export const saveRandomPosts = (randomPosts) => ({
  type: SAVE_RANDOM_POSTS,
  randomPosts: randomPosts,
});
