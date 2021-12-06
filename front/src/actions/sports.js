export const FETCH_SPORTS = 'FETCH_SPORTS';
export const SAVE_SPORTS = 'SAVE_SPORTS';
export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const SAVE_CATEGORIES = 'SAVE_CATEGORIES';
export const FETCH_RANDOM_SPORTS = 'FETCH_RANDOM_SPORTS';
export const SAVE_RANDOM_SPORTS = 'SAVE_RANDOM_SPORTS';

export const fetchSports = () => ({
  type: FETCH_SPORTS,
});

export const saveSports = (sports) => ({
  type: SAVE_SPORTS,
  sports: sports,
});

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const saveCategories = (categories) => ({
  type: SAVE_CATEGORIES,
  categories: categories,
});

export const fetchRandomSports = () => ({
  type: FETCH_RANDOM_SPORTS,
});

export const saveRandomSports = (randomSports) => ({
  type: SAVE_RANDOM_SPORTS,
  randomSports: randomSports,
});
