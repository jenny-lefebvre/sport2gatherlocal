import axios from 'axios';

import { SUBMIT_ADD_POST, successAddpost } from 'src/actions/addpost';

const addpostMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_ADD_POST: {
      const { addpost } = store.getState();
      const { auth } = store.getState();
      // console.log(addpost.title);
      // console.log(auth.id);
      // console.log(store.getState().auth.token);
      axios.post(
        'http://localhost:8000/api/posts',
        {
          title: addpost.title,
          description: addpost.description,
          level: parseInt(addpost.level, 10),
          location: addpost.location,
          minParticipants: parseInt(addpost.minPeople, 10),
          maxParticipants: parseInt(addpost.maxPeople, 10),
          eventDate: addpost.date,
          sport: addpost.sport,
          author: auth.id,
        },
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        },
      ).then((response) => {
        // console.log(response);
        store.dispatch(successAddpost());
      }).catch((error) => {
        console.log(error);
      });
      break;
    }
    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default addpostMiddleware;
