import React from 'react';
import PropTypes from 'prop-types';

const ActivityCounter = ({ events }) => (
  <div className="activity-counter">
    <p className="activity-counter-number"> {events.length} </p>
    <p> {events.length <= 1 ? 'Participation' : 'Participations'} </p>
  </div>
);

ActivityCounter.propTypes = {
  events: PropTypes.array.isRequired,
};

export default ActivityCounter;
