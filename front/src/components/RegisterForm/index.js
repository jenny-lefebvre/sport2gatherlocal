/* eslint-disable arrow-body-style */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import SelectSport from 'src/components/SelectSport';
import RegisterField from './RegisterField';

import './registerForm.scss';

const RegisterForm = ({
  username,
  email,
  password,
  passwordConfirm,
  bio,
  selectAvatar,
  firstSportLevel,
  secondSportLevel,
  thirdSportLevel,
  location,
  changeField,
  handleRegister,
  resetSport,
  sports,
  isRegistered,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log('submit test');
    handleRegister();
  };
  const levelOptions = [
    {
      optionValue: 1,
      optionLabel: 'Débutant',
    },
    {
      optionValue: 2,
      optionLabel: 'Confirmé',
    },
    {
      optionValue: 3,
      optionLabel: 'Expert',
    },
  ];
  const avatarOptions = [
    {
      optionValue: 'https://i.imgur.com/kkwfKRk.png',
      optionLabel: 'avatar-01.png',
      optionPicture: 'https://i.imgur.com/kkwfKRk.png',
    },
    {
      optionValue: 'https://i.imgur.com/nHn1pMl.png',
      optionLabel: 'avatar-02.png',
      optionPicture: 'https://i.imgur.com/nHn1pMl.png',
    },
    {
      optionValue: 'https://i.imgur.com/BiPL4aQ.png',
      optionLabel: 'avatar-03.png',
      optionPicture: 'https://i.imgur.com/BiPL4aQ.png',
    },
    {
      optionValue: 'https://i.imgur.com/XIpB1Dn.png',
      optionLabel: 'avatar-04.png',
      optionPicture: 'https://i.imgur.com/XIpB1Dn.png',
    },
    {
      optionValue: 'https://i.imgur.com/RZqnsGR.png',
      optionLabel: 'avatar-05.png',
      optionPicture: 'https://i.imgur.com/RZqnsGR.png',
    },
    {
      optionValue: 'https://i.imgur.com/iEfMWQC.png',
      optionLabel: 'avatar-06.png',
      optionPicture: 'https://i.imgur.com/iEfMWQC.png',
    },
  ];

  return (
    <div className="register-form">
      {isRegistered && (
        <>
          <div className="success-message">
            <CheckCircleIcon className="success-icon" style={{ fontSize: 30 }} />
            Votre compte utilisateur a été crée avec succès.
          </div>
          <Link className="redirect-home" to="/"><span>&#129030;</span> Retour vers l'accueil</Link>
        </>
      )}
      {!isRegistered && (
        <>
          <h2>Inscription</h2>
          <div className="register-form-content">
            <form onSubmit={handleSubmit}>
              <div className="field register-username">
                <RegisterField
                  name="username"
                  labelName="Nom d'utilisateur"
                  manageChange={changeField}
                  value={username}
                  type="text"
                  field="input"
                />
              </div>
              <div className="field register-email">
                <RegisterField
                  name="email"
                  labelName="Email"
                  manageChange={changeField}
                  value={email}
                  type="text"
                  field="input"
                />
              </div>
              <div className="field register-password">
                <RegisterField
                  name="password"
                  labelName="Mot de passe"
                  manageChange={changeField}
                  value={password}
                  type="password"
                  field="input"
                />
              </div>
              {/* <div className="field register-password-confirm">
                <RegisterField
                  name="passwordConfirm"
                  labelName="Confirmer le mot de passe"
                  manageChange={changeField}
                  value={passwordConfirm}
                  type="password"
                  field="input"
                />
              </div> */}
              <div className="field register-select-avatar">
                <div className="avatar-label">Selectionner une image de profil</div>
                <RegisterField
                  name="selectAvatar"
                  labelName="Sélectionnez un avatar"
                  manageChange={changeField}
                  value={selectAvatar}
                  field="checkbox-image"
                  options={avatarOptions}
                />
              </div>
              <div className="field register-location">
                <RegisterField
                  name="location"
                  labelName="Ville de résidence"
                  manageChange={changeField}
                  value={location}
                  field="input"
                />
              </div>
              <div className="field register-bio">
                <RegisterField
                  name="bio"
                  labelName="Bio (optionnel)"
                  manageChange={changeField}
                  value={bio}
                  type="text"
                  field="textarea"
                />
              </div>
              <div className="field register-select-sports">
                <div>Sports pratiqués</div>
                <div className="sport-details">
                  <SelectSport
                    name="firstSportlabel"
                    manageChange={changeField}
                    manageClear={resetSport}
                    sports={sports}
                    label="1er sport"
                  />
                  <RegisterField
                    name="firstSportLevel"
                    labelName="Niveau"
                    manageChange={changeField}
                    value={firstSportLevel}
                    field="select"
                    addClass="select-sport"
                    options={levelOptions}
                  />
                </div>
                <div className="sport-details">
                  <SelectSport
                    name="secondSportlabel"
                    manageChange={changeField}
                    manageClear={resetSport}
                    sports={sports}
                    label="2eme sport"
                  />
                  <RegisterField
                    name="secondSportLevel"
                    labelName="Niveau"
                    manageChange={changeField}
                    value={secondSportLevel}
                    field="select"
                    addClass="select-sport"
                    options={levelOptions}
                  />
                </div>
                <div className="sport-details">
                  <SelectSport
                    name="thirdSportlabel"
                    manageChange={changeField}
                    manageClear={resetSport}
                    sports={sports}
                    label="3eme sport"
                  />
                  <RegisterField
                    name="thirdSportLevel"
                    labelName="Niveau"
                    manageChange={changeField}
                    value={thirdSportLevel}
                    field="select"
                    addClass="select-sport"
                    options={levelOptions}
                  />
                </div>
              </div>
              <div className="registerform-button">
                <input style={{ cursor: 'pointer' }} className="button" type="submit" value="Valider" />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

RegisterForm.propTypes = {
  /** value for the username */
  username: PropTypes.string.isRequired,
  /** value for the email */
  email: PropTypes.string.isRequired,
  /** Value for the password */
  password: PropTypes.string.isRequired,
  /** Value for the password confirmation */
  passwordConfirm: PropTypes.string.isRequired,

  bio: PropTypes.string,

  selectAvatar: PropTypes.string.isRequired,

  firstSportLevel: PropTypes.string.isRequired,
  secondSportLevel: PropTypes.string.isRequired,
  thirdSportLevel: PropTypes.string.isRequired,

  location: PropTypes.string.isRequired,

  /** called when onChange event is received by an input, two parameters :
   * - new value
   * - name
   */
  changeField: PropTypes.func.isRequired,
  /** called on form submit for test */
  handleRegister: PropTypes.func.isRequired,
  resetSport: PropTypes.func.isRequired,
  sports: PropTypes.array.isRequired,
  isRegistered: PropTypes.bool.isRequired,
};

// Valeurs par défaut pour les props
RegisterForm.defaultProps = {
  bio: '',
};

export default RegisterForm;
