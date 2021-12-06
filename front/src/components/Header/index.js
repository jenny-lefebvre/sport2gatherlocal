import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, Link } from 'react-router-dom';
import Nav from 'src/components/Header/Nav';
import SearchBar from 'src/containers/Header/SearchBar';
import Switch from 'src/components/Switch';
import Login from 'src/containers/Login';
import Account from 'src/components/Account';
import BurgerNav from 'src/containers/BurgerNav';
import Brightness4OutlinedIcon from '@material-ui/icons/Brightness4Outlined';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import { grey } from '@material-ui/core/colors';
import logo from './lelogo.png';

import './header.scss';

const Header = ({ isLogged, username, picture, darkMode, handleChangeTheme }) => (
  <div className="header">
    <div className="header-top">
      <div className="header-top-left">
        <NavLink to="/" exact>
          <img className="main-logo" alt="logo du site" src={logo} />
        </NavLink>
        <NavLink to="/" exact>
          <h1 className="main-title">Sport2Gather</h1>
        </NavLink>
      </div>
      <Nav />
      <BurgerNav />
      <div className="header-top-right">
        <div className="switch-container">
          <div className="theme-switch">
            {!darkMode && (
              <Brightness4Icon className="theme-icon" />
            )}
            <Switch darkMode={darkMode} handleChangeTheme={handleChangeTheme} />
            {darkMode && (
              <Brightness4OutlinedIcon className="theme-icon-dark" style={{ fontSize: 25, color: grey[400] }} />
            )}
          </div>
        </div>
        {!isLogged && (
          <Link
            to="/register"
          >
            <button type="button" className="login-button register-button">S'inscrire</button>
          </Link>
        )}
        <Login />
        {isLogged && <Account username={username} picture={picture} />}
      </div>
    </div>
    <SearchBar />
  </div>
);

Header.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  username: PropTypes.string,
  picture: PropTypes.string,
  darkMode: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  username: null,
  picture: null,
};

export default Header;
