/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import HomeCarrousel from 'src/components/Home/HomeCarrousel';
import PostsSuggestions from 'src/components/Home/PostsSuggestions';
import SportsSuggestions from 'src/components/Home/SportsSuggestions';

import './home.scss';

const Home = ({ randomPostsList, randomSportsList, isLogged, resetPost }) => {
  useEffect(() => {
    resetPost();
    // console.log('reset ok');
  }, []);
  return (
    <div className="home">
      <div className="home-presentation">
        <h2 className="presentation-slogan">Du sport, ensemble !</h2>
        <div className="presentation-details">
          <div>Sport2Gather, c'est une application pensée pour encourager et faciliter la pratique du sport.</div>
          <div>Nous voulons vous offrir la possiblité de trouver à proximité d'autres sportifs motivés, et de vivre des expériences sur-mesure en fonction de votre niveau et de vos objectifs.</div>
          <div>Parcourez les annonces sportives disponibles sur le site pour y participer, ou bien créez en une !</div>
        </div>
        {!isLogged && (
          <Link
            to="/register"
          >
            <button type="button" className="button button-register">S'inscrire</button>
          </Link>
        )}
        {isLogged && (
          <Link
            to="/add"
          >
            <button type="button" className="button button-create">Créer une annonce</button>
          </Link>
        )}
      </div>
      <div className="home-suggestions">
        <h3 className="suggestion-title">Suggestions d'annonces</h3>
        <PostsSuggestions randomPostsList={randomPostsList} />
        <h3 className="suggestion-title">Suggestions de sports</h3>
        <SportsSuggestions randomSportsList={randomSportsList} />
      </div>
    </div>
  );
};

Home.propTypes = {
  randomSportsList: PropTypes.array.isRequired,
  randomPostsList: PropTypes.array.isRequired,
};

export default Home;
