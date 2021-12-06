/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { grey } from '@material-ui/core/colors';

import Field from 'src/components/Field';

import './login.scss';

const Login = ({
  isOpen,
  toggleOpen,
  email,
  password,
  changeField,
  handleLogin,
  isLogged,
  deconnect,
}) => {
  let buttonCssClass = 'login-button';
  if (isOpen) {
    buttonCssClass += ' login-button--open';
  }
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };
  const handleLogout = () => {
    deconnect();
    localStorage.clear();
  };
  return (
    <div className="login">
      {!isLogged && (
        <button
          type="button"
          className={buttonCssClass}
          onClick={() => {
            toggleOpen();
          }}
        >
          {!isOpen ? 'Se connecter' : 'X'}
        </button>
      )}
      {isLogged && (
        <button
          type="button"
          className={`logout ${buttonCssClass}`}
          onClick={() => {
            handleLogout();
          }}
        >
          Se déconnecter
        </button>
      )}
      {isOpen && (
        <form
          autoComplete="off"
          className="login-form"
          onSubmit={handleSubmit}
        >
          <Field
            name="email"
            type="text"
            placeholder="Adresse Email"
            value={email}
            manageChange={changeField}
          />
          <Field
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={password}
            manageChange={changeField}
          />
          <button type="submit" className="button login-submit">Envoyer</button>
        </form>
      )}
    </div>
  );
};

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  deconnect: PropTypes.func.isRequired,
};

export default Login;
