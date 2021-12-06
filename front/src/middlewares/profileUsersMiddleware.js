import axios from 'axios';

import { FETCH_OTHER_USER, saveOtherUser } from 'src/actions/profileUsers';

const profileUsersMiddleware = (store) => (next) => (action) => {
  const url = window.location.href;
  const lastSegment = url.split('/').pop();

  switch (action.type) {
    case FETCH_OTHER_USER:
      axios.get(`http://localhost:8000/api/users/${lastSegment}`)
        .then((response) => {
          store.dispatch(saveOtherUser(response.data));
        }).catch((error) => {
          console.log(error);
        });
      break;
    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default profileUsersMiddleware;
