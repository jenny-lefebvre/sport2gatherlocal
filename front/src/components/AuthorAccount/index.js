import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './authorAccount.scss';
// import avatarLogo from './avatar-profile.png';

const AuthorAccount = ({ author }) => (
  <div className="account">
    <Link to={`/profile/${author.id}`}>
      <img className="avatar-logo" alt="L'avatar" src={author.picture} />
    </Link>
    <p className="avatar-username">{author.username}</p>
  </div>
);

AuthorAccount.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AuthorAccount;
