/* eslint-disable eqeqeq */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import AuthorAccount from 'src/components/AuthorAccount';
import ParticipateButton from 'src/components/Post/ParticipateButton';
import CommentButton from 'src/components/Post/CommentButton';
import Comment from 'src/components/Post/Comment';
import CommentInput from 'src/components/Post/CommentInput';
import { useParams, Link } from 'react-router-dom';
import ConfirmDialog from 'src/components/ConfirmDialog';

import PropTypes from 'prop-types';

// import icon from material UI
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import { grey } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { renderDate } from 'src/utils';
import './post.scss';

const Post = ({
  handleParticipatePost,
  participate,
  displayCommentInput,
  handleCommentClick,
  handleCancelParticipate,
  newComment,
  handlechangeField,
  handleAddComment,
  postsList,
  renderPostId,
  userId,
  checkParticipation,
  removeParticipate,
  isLogged,
  handleDeletePost,
  isDeleted,
}) => {
  const { id } = useParams();
  renderPostId(id);
  const getPostById = (postId, posts) => {
    const postFound = posts.find((post) => post.id == postId);
    return postFound;
  };
  const post = getPostById(id, postsList);
  const remaining = (post.maxParticipants) - (post.participants.length);
  const participantsList = post.participants;
  const getParticipantById = (participantId, participants) => {
    const userFound = participants.find((participant) => participant.id == participantId);
    return userFound;
  };
  let isOrganizer = false;
  if (post.author.id == userId) {
    isOrganizer = true;
  }
  const isParticipating = getParticipantById(userId, participantsList);

  useEffect(() => {
    if (isParticipating !== undefined) {
      // console.log('vous êtes inscrit à cette activité');
      checkParticipation();
    }
    else {
      // console.log('vous netes pas inscrit');
      removeParticipate();
    }
  }, []);

  return (
    <div className="post">
      {isDeleted && (
        <>
          <div className="success-message">
            <CheckCircleIcon className="success-icon" style={{ fontSize: 30 }} />
            Votre annonce a bien été supprimée.
          </div>
          <Link className="redirect-home" to="/"><span>&#129030;</span> Retour vers l'accueil</Link>
        </>
      )}
      {!isDeleted && (
        <>
          <div className="post-content">
            {isOrganizer && (
              <div className="manage-post">
                <ConfirmDialog handleDeletePost={handleDeletePost} />
                <div className="button post-button edit"><EditSharpIcon /></div>
              </div>
            )}
            <div className="post-title">
              {post.title}
            </div>
            <AuthorAccount author={post.author} />
            <div className="post-description">
              "{post.description}"
            </div>
            <div className="post-detail">
              <EmojiEventsIcon className="post-icons" style={{ color: grey[600] }} />
              {post.sport.name}
            </div>
            <div className="post-detail">
              <EventIcon className="post-icons" style={{ color: grey[600] }} />
              {renderDate(post.eventDate)}
            </div>
            <div className="post-detail">
              <LocationOnIcon className="post-icons" style={{ color: grey[600] }} />
              {post.location}
            </div>
            <div className="participants">
              <p>Participants</p>
              {post.participants.map((participant) => (
                <Link key={participant.id} to={`/profile/${participant.id}`}>
                  <div key={participant.id} className="participant-username">{participant.username}</div>
                </Link>
              ))}
            </div>
            {post.maxParticipants !== null && (
              <div className="post-detail remaining-places">
                <span>{remaining}</span>
                <div>place(s) restante(s)</div>
              </div>
            )}
            {post.maxParticipants == null && (
              <div className="post-detail remaining-places">
                <div>Nombre de participants non limité</div>
              </div>
            )}
            {isLogged && (
              <div className="post-buttons">
                <div className="buttons-container">
                  {!displayCommentInput && <CommentButton handleClick={handleCommentClick} />}
                  {!isOrganizer && (
                    <ParticipateButton
                      handleClick={handleParticipatePost}
                      participate={participate}
                    />
                  )}
                  {participate && <span className="cancel-participation" onClick={handleCancelParticipate}>X Annuler</span>}
                </div>
              </div>
            )}
            {!isLogged && (
              <div className="redirect-register">
                <div>Vous souhaitez participer ? Inscrivez-vous sur le site !</div>
                <Link
                  to="/register"
                >
                  <div className="button-container">
                    <button type="button" className="button button-register">S'inscrire</button>
                  </div>
                </Link>
              </div>
            )}
          </div>
          {displayCommentInput && (
            <CommentInput
              handleClick={handleCommentClick}
              manageChange={handlechangeField}
              handleCommentSubmit={handleAddComment}
              value={newComment}
            />
          )}
          <div className="comments">Commentaires</div>
          <div className="post-comments">
            {post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

Post.propTypes = {
  handleParticipatePost: PropTypes.func.isRequired,
  participate: PropTypes.bool.isRequired,
  displayCommentInput: PropTypes.bool.isRequired,
  handleCommentClick: PropTypes.func.isRequired,
  handleCancelParticipate: PropTypes.func.isRequired,
  newComment: PropTypes.string.isRequired,
  handlechangeField: PropTypes.func.isRequired,
  handleAddComment: PropTypes.func.isRequired,
  postsList: PropTypes.array.isRequired,
  renderPostId: PropTypes.func.isRequired,
};

export default Post;
