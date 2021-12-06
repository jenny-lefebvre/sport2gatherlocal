import axios from 'axios';

import {
  FETCH_SPORTS,
  saveSports,
  FETCH_CATEGORIES,
  saveCategories,
  FETCH_RANDOM_SPORTS,
  saveRandomSports,
} from '../actions/sports';

const SportsMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
    case FETCH_SPORTS:
      // console.log('on va envoyer une requête pour récupérer les sports');
      axios.get('http://localhost:8000/api/sports')
        .then((response) => {
          // console.log(response);
          // aller placer response.data dans le state
          // => on dispatch une action qui sera traitée par le reducer
          const newAction = saveSports(response.data);
          store.dispatch(newAction);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case FETCH_CATEGORIES:
      // console.log('on va envoyer une requête pour récupérer les catégories');
      axios.get('http://localhost:8000/api/categories')
        .then((response) => {
          // console.log(response);
          // aller placer response.data dans le state
          // => on dispatch une action qui sera traitée par le reducer
          const newAction = saveCategories(response.data);
          store.dispatch(newAction);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    case FETCH_RANDOM_SPORTS:
      axios.get(('http://localhost:8000/api/random/sports'))
        .then((response) => {
          const randomSportsData = response.data;
          const randomSportsLimited = randomSportsData.slice(0, 3);
          // console.log(randomSportsLimited);
          store.dispatch(saveRandomSports(randomSportsLimited));
        }).catch((error) => {
          console.log(error);
        });
      break;
    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default SportsMiddleware;
