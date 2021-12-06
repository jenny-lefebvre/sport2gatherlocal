import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import icon from material UI
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { grey } from '@material-ui/core/colors';

import Filter from 'src/components/Posts/Filter';
import PostCard from 'src/components/Posts/PostCard';
import SelectLocation from 'src/components/SelectLocation';

// import PostsData from 'src/data';

import './posts.scss';

const Posts = ({
  posts,
  sportfilter,
  datefilter,
  locationfilter,
  changeField,
  resetLocation,
  isLogged,
  resetPost,
}) => {
  useEffect(() => {
    resetPost();
  }, []);
  return (
    <div className="posts">
      <div className="filter-container">
        <h2 className="title-post">{posts.length} {posts.length == 1 ? 'Annonce trouvée' : 'Annonces trouvées'} </h2>
        <h3>Affiner la recherche :</h3>
        <div className="posts-filters">
          <div className="filter-row">
            <EmojiEventsIcon style={{ fontSize: 30, color: grey[600] }} />
            <Filter
              label="Sport"
              field="select"
              name="sportfilter"
              value={sportfilter}
              manageChange={changeField}
            />
          </div>
          <div className="filter-row">
            <EventIcon style={{ fontSize: 30, color: grey[600] }} />
            <Filter
              label="Date"
              field="date"
              name="datefilter"
              value={datefilter}
              manageChange={changeField}
            />
          </div>
          <div className="combobox-row">
            <LocationOnIcon style={{ fontSize: 30, color: grey[600] }} />
            <SelectLocation
              SelectedValue={locationfilter}
              manageChange={changeField}
              name="locationfilter"
              manageClear={resetLocation}
            />
          </div>
          {/* <div className="button-container">
          <button type="button" className="button button-apply-filter">
            Appliquer les filtres
          </button>
        </div> */}
        </div>
        <div>
          <div className="title-post">Proposer une activité sportive</div>
          {isLogged && (
            <Link
              to="/add"
            >
              <div className="button-container">
                <button type="button" className="button button-create-post">Créer une annonce</button>
              </div>
            </Link>
          )}
          {!isLogged && (
            <>
              <h3>Veuillez vous inscrire pour poster une annonce.</h3>
              <Link
                to="/register"
              >
                <div className="button-container">
                  <button type="button" className="button button-create-post">S'inscrire</button>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="posts-cards-results">
        {posts.map((data) => (
          <PostCard
            {...data}
            key={data.id}
          />
        ))}
      </div>
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  sportfilter: PropTypes.string.isRequired,
  datefilter: PropTypes.string.isRequired,
  locationfilter: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  resetLocation: PropTypes.func.isRequired,
};

export default Posts;
