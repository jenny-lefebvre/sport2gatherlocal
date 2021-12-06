import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SportsSuggestions = ({ randomSportsList }) => (
  <div className="sports-suggestions">
    {randomSportsList.map((randomSports) => (
      <div key={randomSports.id} className="sportcard-random">
        <Link to={`posts/${randomSports.slug}`}>
          <img alt="sport" src={randomSports.picture} />
          <div className="sport-name">{randomSports.name}</div>
        </Link>
      </div>
    ))}
  </div>
);

SportsSuggestions.propTypes = {
  randomSportsList: PropTypes.array.isRequired,
};

export default SportsSuggestions;
