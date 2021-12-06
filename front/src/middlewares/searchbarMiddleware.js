import axios from 'axios';
import { saveFilteredPosts, SUBMIT_SEARCHBAR } from '../actions/searchbar';

import {
  FETCH_SPORTS, saveSports,
} from '../actions/sports';

const searchbarMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  const { sport } = store.getState().searchbar;
  const { place } = store.getState().searchbar;
  const { date } = store.getState().searchbar;

  let sportUrl = sport;
  if (sportUrl == '') {
    sportUrl = '*';
  }

  let placeUrl = place;
  if (placeUrl == '') {
    placeUrl = '*';
  }

  let dateUrl = date;
  if (dateUrl == '') {
    dateUrl = '*';
  }

  // console.log(dateUrl);

  // console.log(sport);
  // console.log(place);
  // console.log(date);

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
    case SUBMIT_SEARCHBAR:
      // console.log(store.getState());

      axios.get(`http://localhost:8000/api/posts/${sportUrl}/${placeUrl}/${dateUrl}`)
        .then((response) => {
          // console.log(response);
          // aller placer response.data dans le state
          // => on dispatch une action qui sera traitée par le reducer
          const newAction = saveFilteredPosts(response.data);
          store.dispatch(newAction);
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default searchbarMiddleware;
