import { connect } from 'react-redux';

// on importe le composant de présentation
import Post from 'src/components/Post';

import {
  participatePost,
  displayCommentInput,
  cancelParticipatePost,
  updateCommentField,
  addNewComment,
  upddatePostId,
  successParticipate,
  doNotParticipate,
  deletePost,
  resetDeleted,
} from 'src/actions/post';

// === mapStateToProps
// si j'ai besoin de lire des informations dans le state
const mapStateToProps = (state) => ({
  currentId: state.post.id,
  participate: state.post.participate,
  displayCommentInput: state.post.displayCommentInput,
  newComment: state.post.newComment,
  postsList: state.posts.postsList,
  picture: state.auth.picture,
  username: state.auth.username,
  userId: state.auth.id,
  currentPostId: state.post.id,
  isLogged: state.auth.isLogged,
  isDeleted: state.post.isDeleted,
});

// === mapDispatchToProps
// si j'ai besoin de dispatcher des actions vers le store (mettre à jour le state)
const mapDispatchToProps = (dispatch) => ({
  handleParticipatePost: () => {
    dispatch(participatePost());
  },
  handleCommentClick: () => {
    dispatch(displayCommentInput());
  },
  handleCancelParticipate: () => {
    dispatch(cancelParticipatePost());
  },
  handlechangeField: (newValue) => {
    dispatch(updateCommentField(newValue));
  },
  handleAddComment: () => {
    dispatch(addNewComment());
  },
  renderPostId: (newId) => {
    dispatch(upddatePostId(newId));
  },
  checkParticipation: () => {
    dispatch(successParticipate());
  },
  removeParticipate: () => {
    dispatch(doNotParticipate());
  },
  handleDeletePost: () => {
    dispatch(deletePost());
  },
});

// === création de l'assistant
export default connect(mapStateToProps, mapDispatchToProps)(Post);
