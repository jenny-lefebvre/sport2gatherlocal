import React from 'react';
import PropTypes from 'prop-types';

const ParticipateButton = ({ handleClick, participate }) => {
  const addClass = participate ? 'participate' : 'registered';
  const message = participate ? 'Inscrit' : 'Participer';
  return (
    <button
      onClick={handleClick}
      type="button"
      className={`button post-button ${addClass}`}
    >
      {message}
    </button>
  );
};

ParticipateButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  participate: PropTypes.bool.isRequired,
};

export default ParticipateButton;
