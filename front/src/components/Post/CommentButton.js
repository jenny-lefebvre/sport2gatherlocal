import React from 'react';
import PropTypes from 'prop-types';

// import './xxxx.scss';

const CommentButton = ({ handleClick }) => (
  <button
    type="button"
    className="button post-button"
    onClick={handleClick}
  >
    Commenter
  </button>
);

CommentButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default CommentButton;
