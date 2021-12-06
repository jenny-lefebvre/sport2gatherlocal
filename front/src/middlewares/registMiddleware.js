import axios from 'axios';

import { SUBMIT_REGISTER, successRegister } from 'src/actions/regist';

const registMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case SUBMIT_REGISTER: {
      const { regist } = store.getState();
      axios.post(
        'http://100.25.159.39/api/users',
        {
          email: regist.email,
          username: regist.username,
          password: regist.password,
          picture: regist.selectAvatar,
          description: regist.bio,
          practicedSports: [
            {
              sport: regist.firstSportlabel,
              level: parseInt(regist.firstSportLevel, 10),
            },
            {
              sport: regist.secondSportlabel,
              level: parseInt(regist.secondSportLevel, 10),
            },
            {
              sport: regist.thirdSportlabel,
              level: parseInt(regist.thirdSportLevel, 10),
            },
          ],
          location: regist.location,
        },
      ).then((response) => {
        console.log(response);
        store.dispatch(successRegister());
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

export default registMiddleware;
