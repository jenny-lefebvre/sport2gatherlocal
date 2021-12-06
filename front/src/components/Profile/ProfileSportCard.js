import React from 'react';
import PropTypes from 'prop-types';
import { renderLevel } from 'src/utils';

const ProfileSportCard = ({ level, sport }) => (
  <div className="profile-sportcard">
    <img className="profile-sportcard-picture" src={sport.picture} alt="a blue square" />
    <p className="single-label"> {sport.name} </p>
    <div className="level-container">
      <div className={`level-tag ${renderLevel(level)}`}>
        {renderLevel(level)}
      </div>
    </div>
  </div>
);

ProfileSportCard.propTypes = {
  level: PropTypes.number.isRequired,
  sport: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      picture: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

ProfileSportCard.defaultProps = {
};

export default ProfileSportCard;
