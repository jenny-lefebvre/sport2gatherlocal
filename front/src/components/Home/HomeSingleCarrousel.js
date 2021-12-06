import React from 'react';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import blueSquare from 'src/components/SingleCarrousel/sport-picture.jpg';

import './home.scss';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const SingleCarrousel = () => (

  <div className="single-carrousel">
    <Carousel responsive={responsive} centerMode>
      <div className="home-single-div-carrousel">
        <img className="home-single-picture" src={blueSquare} alt="a blue square" />
        <p className="home-single-label"> Basket-ball </p>
      </div>
      <div className="home-single-div-carrousel">
        <img className="home-single-picture" src={blueSquare} alt="a blue square" />
        <p className="home-single-label"> Basket-ball </p>
      </div>
      <div className="home-single-div-carrousel">
        <img className="home-single-picture" src={blueSquare} alt="a blue square" />
        <p className="home-single-label"> Basket-ball </p>
      </div>
      <div className="home-single-div-carrousel">
        <img className="home-single-picture" src={blueSquare} alt="a blue square" />
        <p className="home-single-label"> Basket-ball </p>
      </div>
      <div className="home-single-div-carrousel">
        <img className="home-single-picture" src={blueSquare} alt="a blue square" />
        <p className="home-single-label"> Basket-ball </p>
      </div>
      <div className="home-single-div-carrousel">
        <img className="home-single-picture" src={blueSquare} alt="a blue square" />
        <p className="home-single-label"> Basket-ball </p>
      </div>
      <div className="home-single-div-carrousel">
        <img className="home-single-picture" src={blueSquare} alt="a blue square" />
        <p className="home-single-label"> Basket-ball </p>
      </div>
      <div className="home-single-div-carrousel">
        <img className="home-single-picture" src={blueSquare} alt="a blue square" />
        <p className="home-single-label"> Basket-ball </p>
      </div>

    </Carousel>
    {/* <Carousel width="20%">
      <div className="single-slide">
        <img className="single-picture" src={blueSquare} alt="a blue square" />
        <p className="legend">Legend 1</p>
      </div>
      <div className="single-slide">
        <img className="single-picture" src={blueSquare} alt="a blue square" />
        <p className="legend">Legend 2</p>
      </div>
      <div className="single-slide">
        <img className="single-picture" src={blueSquare} alt="a blue square" />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel> */}
  </div>
);

export default SingleCarrousel;
