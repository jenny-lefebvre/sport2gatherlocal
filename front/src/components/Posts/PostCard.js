import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthorAccount from 'src/components/AuthorAccount';
// import icon from material UI
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import { grey } from '@material-ui/core/colors';

import { renderLevel, renderDate } from 'src/utils';

const PostCard = ({
  title,
  sport,
  eventDate,
  location,
  id,
  author,
  level,
}) => (
  <div className="post-card">
    <img className="post-sport-picture" alt="sport" src={sport.picture} />
    <div className="post-card-content">
      <div className="post-title">{title}</div>
      <AuthorAccount author={author} />
      <div className="post-detail">
        <EmojiEventsIcon className="post-icons" style={{ color: grey[600] }} />
        {sport.name}
      </div>
      <div className="post-detail">
        <EventIcon className="post-icons" style={{ color: grey[600] }} />
        {renderDate(eventDate)}
      </div>
      <div className="post-detail">
        <LocationOnIcon className="post-icons" style={{ color: grey[600] }} />
        {location}
      </div>
      {level !== null && (
        <div className="level-container">
          Niveau souhaité
          <div className={`level-tag ${renderLevel(level)}`}>{renderLevel(level)}</div>
        </div>
      )}
      <Link
        className="post-link"
        to={`/post/${id}`}
      >Voir le détail
      </Link>
    </div>
  </div>

);

PostCard.propTypes = {
  title: PropTypes.string.isRequired,
  sport: PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  eventDate: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  author: PropTypes.object.isRequired,
  level: PropTypes.number,

};

// Valeurs par défaut pour les props
PostCard.defaultProps = {
  level: null,
};

export default PostCard;
