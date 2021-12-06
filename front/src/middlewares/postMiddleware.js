import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
  PARTICIPATE_POST,
  successParticipate,
  CANCEL_PARTICIPATE_POST,
  doNotParticipate,
  ADD_NEW_COMMENT,
  successComment,
  DELETE_POST,
  successDeletePost,
} from 'src/actions/post';

const postMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case PARTICIPATE_POST: {
      const { post } = store.getState();
      const { auth } = store.getState();
      const postId = post.id;
      const userId = auth.id;

      axios.post(
        `http://100.25.159.39/api/posts/${postId}/add/${userId}`,
        // datas
        {},
        // options : headers
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        },
      ).then((response) => {
        console.log(response);
        store.dispatch(successParticipate());
      }).then((error) => {
        console.log(error);
      });
      break;
    }
    case CANCEL_PARTICIPATE_POST: {
      const { post } = store.getState();
      const { auth } = store.getState();
      const postId = post.id;
      const userId = auth.id;

      axios.delete(
        `http://100.25.159.39/api/posts/${postId}/delete/${userId}`,
        // options : headers
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        },
      ).then((response) => {
        console.log(response);
        store.dispatch(doNotParticipate());
      }).then((error) => {
        console.log(error);
      });
      break;
    }
    case DELETE_POST: {
      // api/posts/id
      const { post } = store.getState();
      const postId = post.id;

      axios.delete(
        `http://100.25.159.39/api/posts/${postId}`,
        // options : headers
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        },
      ).then((response) => {
        console.log(response);
        store.dispatch(successDeletePost());
      }).then((error) => {
        console.log(error);
      });
      break;
    }
    case ADD_NEW_COMMENT: {
      const { post } = store.getState();
      const { auth } = store.getState();
      axios.post(
        'http://100.25.159.39/api/comments',
        // datas
        {
          content: post.newComment,
          post: post.id,
          user: auth.id,
        },
        // options : headers
        {
          headers: {
            Authorization: `Bearer ${store.getState().auth.token}`,
          },
        },
      ).then((response) => {
        console.log(response);
        store.dispatch(successComment());
      }).then((error) => {
        console.log(error);
      });
      break;
    }
    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default postMiddleware;
