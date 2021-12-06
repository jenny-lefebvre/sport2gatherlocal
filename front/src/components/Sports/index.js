import React from 'react';
import SingleCarrousel from 'src/containers/Sports/SingleCarrousel';
import PropTypes from 'prop-types';

import './sports.scss';

const Sports = ({ categories }) => (

  <div className="sports">
    <div className="sports-title">
      <h2>Trouver une activité sportive</h2>
    </div>
    <div className="sports-categories">
      {categories.map((category) => (
        <div key={category.id} className="sports-category">
          <h3 className="sports-category-name"> {category.name} </h3>
          <SingleCarrousel props={category.id} />
        </div>
      ))}
    </div>
  </div>
);

Sports.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default Sports;
