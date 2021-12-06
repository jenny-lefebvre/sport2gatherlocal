import React from 'react';
import PropTypes from 'prop-types';

const ProfileAvatar = ({ picture }) => (
  <div className="profile-avatar">
    <img className="avatar-logo" alt="L'avatar" src={picture} />
  </div>
);

ProfileAvatar.propTypes = {
  picture: PropTypes.string.isRequired,
};

export default ProfileAvatar;
