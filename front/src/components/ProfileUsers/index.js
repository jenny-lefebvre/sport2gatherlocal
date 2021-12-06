/* eslint-disable max-len */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import ProfileAvatar from 'src/components/Profile/ProfileAvatar';
import ActivityCounter from 'src/components/Profile/ActivityCounter';
import ProfileSportCard from 'src/components/Profile/ProfileSportCard';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import { grey } from '@material-ui/core/colors';

import '../Profile/profile.scss';

const ProfileUsers = ({
  user,
  loadUser,
  userDataLoaded,
}) => {
  useEffect(() => {
    loadUser();
  }, []);

  return (

    <div className="profile">
      {userDataLoaded && (
      <div className="profile-content">
        <div className="profile-top">
          <ProfileAvatar
            picture={user.picture}
          />
          <ActivityCounter
            events={user.events}
          />
        </div>
        <div className="profile-main">
          <div className="profile-pseudo"> {user.username} </div>
          <div className="profile-city">
            <LocationOnIcon className="post-icons" style={{ color: grey[600] }} />
            {user.location}
          </div>
          <div className="profile-bio">
            {user.description}
          </div>
          <div className="profile-sports">
            <EmojiEventsIcon className="post-icons" style={{ color: grey[600] }} />
            Mes sports
          </div>
          <div className="profile-sports-cards">
            {user.practicedSports.map((sport) => (
              <ProfileSportCard
                {...sport}
                key={sport.id}
              />
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

ProfileUsers.propTypes = {
  loadUser: PropTypes.func.isRequired,
  userDataLoaded: PropTypes.bool.isRequired,
  user: PropTypes.array.isRequired,
};

export default ProfileUsers;
