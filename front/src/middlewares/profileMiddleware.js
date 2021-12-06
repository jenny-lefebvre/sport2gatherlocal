import axios from 'axios';

import { FETCH_USER, saveUser } from 'src/actions/profile';

const profileMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);
  const { id } = store.getState().auth;

  switch (action.type) {
    case FETCH_USER:
      axios.get(`http://localhost:8000/api/users/${id}`)
        .then((response) => {
          // console.log(response);
          store.dispatch(saveUser(response.data));
        }).catch((error) => {
          console.log(error);
        });
      break;
    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default profileMiddleware;
