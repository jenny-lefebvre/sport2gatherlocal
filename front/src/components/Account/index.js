import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './account.scss';

const Account = ({ username, picture }) => (
  <div className="account">
    <Link
      to="/profile"
    >
      <img className="avatar-logo" alt="L'avatar" src={picture} />
    </Link>
    <p className="avatar-username">{username}</p>
  </div>
);

Account.propTypes = {
  username: PropTypes.string,
  picture: PropTypes.string,
};

Account.defaultProps = {
  username: null,
  picture: null,
};

export default Account;
