import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';

// import icon from material UI
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import EventIcon from '@material-ui/icons/Event';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { grey } from '@material-ui/core/colors';
import SelectLocation from 'src/components/SelectLocation';

import Filter from 'src/components/Posts/Filter';
import PostCard from 'src/components/Posts/PostCard';

// import PostsData from 'src/data';

import './postsSports.scss';

const PostsSports = ({
  posts,
  sportfilter,
  datefilter,
  locationfilter,
  changeField,
  resetLocation,
}) => {
  const { sport } = useParams();
  // console.log(`on veut afficher le sport qui a le slug ${sport}`);
  let tabPosts = [];
  const sportToCheck = sport;
  // const sportToCheck = (window.location.href).replace('http://localhost:8080/posts/', '');
  // eslint-disable-next-line prefer-const

  for (let i = 0; i < posts.length; i += 1) {
    // eslint-disable-next-line eqeqeq
    if (posts[i].sport.slug == sportToCheck) {
      tabPosts.push(posts[i]);
      // console.log(tabPosts);
    }
  }

  // const getPostsBySlug = (postSlug, annonces) => {
  //   const postsFound = annonces.filter((annonce) => annonce.slug == postSlug);
  //   return postsFound;
  // };
  // const post = getPostsBySlug(sport, posts);
  // console.log(post);
  return (

    <div className="posts">
      <div className="filter-container">
        <h2 className="title-post">{tabPosts.length} {tabPosts.length == 1 ? 'Annonce trouvée' : 'Annonces trouvées'}</h2>
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
            <SelectLocation SelectedValue={locationfilter} manageChange={changeField} name="locationfilter" manageClear={resetLocation} />
          </div>
          <div className="button-container">
            <button type="button" className="button button-apply-filter">Appliquer les filtres</button>
          </div>
        </div>
        <div>
          <div className="title-post">Proposer une activité sportive</div>
          <Link
            to="/add"
          >
            <div className="button-container">
              <button type="button" className="button button-create-post">Créer une annonce</button>
            </div>
          </Link>
        </div>
      </div>
      <div className="posts-cards-results">
        {tabPosts.map((data) => (
          <PostCard
            {...data}
            key={data.id}
          />
        ))}
      </div>
    </div>
  );
};

PostsSports.propTypes = {
  posts: PropTypes.array.isRequired,
  sportfilter: PropTypes.string.isRequired,
  datefilter: PropTypes.string.isRequired,
  locationfilter: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  resetLocation: PropTypes.func.isRequired,
};

export default PostsSports;
