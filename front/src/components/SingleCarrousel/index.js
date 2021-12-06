import React, { useEffect } from 'react';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import './singleCarrousel.scss';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SingleCarrousel = ({ props, loadSports, sports }) => {
  useEffect(() => {
    loadSports();
  }, []);

  // console.log(sports);
  // eslint-disable-next-line prefer-const
  let tabSport = [];
  const apiSportList = sports;
  // eslint-disable-next-line prefer-const
  let categoryToCheck = props;
  for (let i = 0; i < apiSportList.length; i += 1) {
    for (let j = 0; j < apiSportList[i].categories.length; j += 1) {
      // eslint-disable-next-line eqeqeq
      if (apiSportList[i].categories[j].id == categoryToCheck) {
        tabSport.push(apiSportList[i]);
      }
    }
  }
  return (
    <div>
      <div className="single-carrousel">
        <Carousel responsive={responsive} centerMode infinite>
          {tabSport.map((singleSport) => (
            <div key={singleSport.id} className="single-div-carrousel">
              <Link
                to={`posts/${singleSport.slug}`}
              >
                <img className="single-picture" src={singleSport.picture} alt="" />
                <p className="single-label">{singleSport.name}</p>
              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

SingleCarrousel.propTypes = {
  props: PropTypes.number.isRequired,
  loadSports: PropTypes.func.isRequired,
  sports: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      slug: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

export default SingleCarrousel;
