import axios from 'axios';

import { SUBMIT_LOGIN, connectUser } from 'src/actions/auth';

const authMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_LOGIN: {
      // console.log(store.getState());
      const { auth } = store.getState();
      // console.log(auth.email);
      // console.log(auth.password);
      axios.post(
        // url
        'http://100.25.159.39/api/login_check',
        {
          email: auth.email,
          password: auth.password,
        },
      ).then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('id', response.data.data.id);
        localStorage.setItem('picture', response.data.data.picture);
        localStorage.setItem('username', response.data.data.username);
        // localStorage.setItem('darkMode', auth.darkMode);
        // console.log('authentification réussie');
        store.dispatch(connectUser(
          response.data.token,
          response.data.data.id,
          response.data.data.picture,
          response.data.data.username,
        ));
      }).catch((error) => {
        console.log(error);
      });
      break;
    }
    default:
  }

  next(action);
};

export default authMiddleware;
