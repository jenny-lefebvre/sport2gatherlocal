import React from 'react';
import './notFound.scss';
import { Link } from 'react-router-dom';
import gif from './404.gif';

const NotFound = () => (
  <div className="not-found">
    <div className="not-found-container">404</div>
    <div className="troll-message">On dirait que vous vous êtes planté...</div>
    <img className="gif" id="not-found-gif" alt="gif page 404" src={gif} />
    <Link to="/"><div className="back-home">Retour vers l'accueil</div></Link>
  </div>
);

export default NotFound;
