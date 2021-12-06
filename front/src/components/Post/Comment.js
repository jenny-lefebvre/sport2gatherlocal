import React from 'react';
import { Link } from 'react-router-dom';

import './post.scss';

const Comment = ({ comment }) => (
  <div className="comment">
    <Link to={`/profile/${comment.user.id}`}>
      <div className="account">
        <img className="avatar-logo" alt="L'avatar" src={comment.user.picture} />
        <p className="avatar-username">{comment.user.username}</p>
      </div>
    </Link>
    <p className="comment-content">{comment.content}</p>
  </div>
);

export default Comment;
