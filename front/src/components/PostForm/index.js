import React from 'react';

// import proptypes
import PropTypes from 'prop-types';

// import icon from material UI
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import GradeIcon from '@material-ui/icons/Grade';
import { grey } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

// import sub components
import SelectSport from 'src/components/SelectSport';
import SelectLocation from 'src/components/SelectLocation';
import PostformField from './PostformField';

// css import
import './postForm.scss';

const PostForm = ({
  title,
  description,
  minPeople,
  maxPeople,
  date,
  location,
  level,
  changeField,
  handleAddPost,
  username,
  userPicture,
  resetSport,
  sports,
  resetLocation,
  isAdded,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    // console.log('submit test');
    handleAddPost();
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
  return (
    <div className="postform">
      {isAdded && (
        <>
          <div className="success-message">
            <CheckCircleIcon className="success-icon" style={{ fontSize: 30 }} />
            Votre annonce a été postée avec succès.
          </div>
          <Link className="redirect-posts" to="/posts"><span>&#129030;</span> Retour vers les annonces</Link>
        </>
      )}
      {!isAdded && (
        <>
          <h2>Créer une annonce</h2>
          <div className="postform-content">
            <div className="postform-author">
              <img className="user-image" src={userPicture} alt="avatar" />
              <div className="user-name">{username}</div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="postform-title">
                <PostformField
                  name="title"
                  labelName="Titre de votre annonce"
                  manageChange={changeField}
                  value={title}
                  type="text"
                  field="textarea"
                />
              </div>
              <div className="postform-description">
                <PostformField
                  name="description"
                  labelName="Description"
                  manageChange={changeField}
                  value={description}
                  type="text"
                  field="textarea"
                  addClass="textarea-description"
                />
              </div>
              <div>Nombre de participants</div>
              <div className="postform-participants">
                <div className="postform-minPeople">
                  <PostformField
                    name="minPeople"
                    labelName="Min"
                    manageChange={changeField}
                    value={minPeople}
                    type="number"
                    field="input"
                  />
                </div>
                <div className="postform-maxPeople">
                  <PostformField
                    name="maxPeople"
                    labelName="Max"
                    manageChange={changeField}
                    value={maxPeople}
                    type="number"
                    field="input"
                  />
                </div>
              </div>
              <div className="autocomplete-row">
                <div className="autocomplete-icon">
                  <EmojiEventsIcon style={{ fontSize: 30, color: grey[600] }} />
                </div>
                <SelectSport
                  name="sport"
                  manageChange={changeField}
                  manageClear={resetSport}
                  sports={sports}
                  label="Sélectionnez un sport"
                />
              </div>
              <div className="postform-date postform-label-row">
                <EventIcon style={{ fontSize: 30, color: grey[600] }} />
                <PostformField
                  name="date"
                  manageChange={changeField}
                  value={date}
                  field="inputDate"
                />
              </div>
              <div className="autocomplete-row">
                <div className="autocomplete-icon">
                  <LocationOnIcon style={{ fontSize: 30, color: grey[600] }} />
                </div>
                <SelectLocation
                  SelectedValue={location}
                  manageChange={changeField}
                  name="location"
                  manageClear={resetLocation}
                />
              </div>
              <div className="postform-level postform-label-row">
                <GradeIcon style={{ fontSize: 30, color: grey[600] }} />
                <PostformField
                  name="level"
                  manageChange={changeField}
                  value={level}
                  field="select"
                  labelName="Niveau requis (facultatif)"
                  options={levelOptions}
                />
              </div>
              <div className="postform-button">
                <input style={{ cursor: 'pointer' }} className="button" type="submit" value="Valider" />
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

PostForm.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  minPeople: PropTypes.string.isRequired,
  maxPeople: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handleAddPost: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  userPicture: PropTypes.string.isRequired,
  resetSport: PropTypes.func.isRequired,
  sports: PropTypes.array.isRequired,
  resetLocation: PropTypes.func.isRequired,
  isAdded: PropTypes.bool.isRequired,
};

export default PostForm;
