import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

const Nav = () => (
  <div className="nav">
    <NavLink
      to="/"
      className="nav-item"
      activeClassName="nav-item--active"
      exact
    >
      Accueil
    </NavLink>
    <NavLink
      to="/sports"
      className="nav-item"
      activeClassName="nav-item--active"
      exact
    >
      Sports
    </NavLink>
    <NavLink
      to="/posts"
      className="nav-item"
      activeClassName="nav-item--active"
      exact
    >
      Annonces
    </NavLink>
    <NavLink
      to="/about"
      className="nav-item"
      activeClassName="nav-item--active"
      exact
    >
      A propos
    </NavLink>
  </div>
);

export default Nav;
