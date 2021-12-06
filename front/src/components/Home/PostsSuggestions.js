/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EventIcon from '@material-ui/icons/Event';
import { grey } from '@material-ui/core/colors';

import { renderDate } from 'src/utils';

const PostsSuggestions = ({ randomPostsList }) => (
  <div className="posts-suggestions">
    {randomPostsList.map((randomPost) => {
      return (
        <div key={randomPost.id} className="postcard-random">
          <Link to={`post/${randomPost.id}`}>
            <div className="author">
              <img alt="avatar" src={randomPost.author.picture} />
              <div className="username">{randomPost.author.username}</div>
            </div>
            <div className="postcard-detail">
              <EmojiEventsIcon className="post-icons" style={{ color: grey[600] }} />
              {randomPost.sport.name}
            </div>
            <div className="postcard-detail">
              <EventIcon className="post-icons" style={{ color: grey[600] }} />
              {renderDate(randomPost.eventDate)}
            </div>
            <div className="postcard-detail">
              <LocationOnIcon className="post-icons" style={{ color: grey[600] }} />
              {randomPost.location}
            </div>
          </Link>
        </div>
      );
    })}
  </div>
);

// <div>

PostsSuggestions.propTypes = {
  randomPostsList: PropTypes.array.isRequired,
};

export default PostsSuggestions;
