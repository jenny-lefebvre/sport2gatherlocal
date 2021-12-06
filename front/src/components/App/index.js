// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from 'src/containers/Header';
import Page from 'src/components/Page';
import Footer from 'src/components/Footer';
import Loader from 'src/components/Loader';

// == Import
import './styles.scss';

// == Composant
const App = ({
  token,
  keepConnexion,
  loadPosts,
  postsLoaded,
  loadCategories,
  categoriesLoaded,
  loadSports,
  sportsLoaded,
  isAdded,
  participate,
  displayCommentInput,
  loadRandomPosts,
  randomPostsLoaded,
  loadRandomSports,
  randomSportsLoaded,
  darkMode,
  isDeleted,
  resetPost,
  reloadPosts,
}) => {
  useEffect(() => {
    /*
    - when component App is mounted, it means in case of "refresh"
    - the following effect is apply :
    - if the state token is not null OR if the localStorage token is not null
    - a function is called to keep the connexion and data of connexion
     */
    if (token !== null || localStorage.getItem('token') !== null) {
      keepConnexion();
      localStorage.setItem('darkMode', darkMode);
    }
    /*
    - the effect is apply again if the value of "token" is changing.
    - this the case when the button "Se déconnecter" is clicked.
     */
  }, [token, darkMode]);
  useEffect(() => {
    loadPosts();
    /*
    - the effect is apply again if the value of "isAdded" is changing.
    - this the case when a new post is created by a user.
     */
  }, [isAdded, participate, displayCommentInput, reloadPosts]);
  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    loadSports();
  }, []);
  useEffect(() => {
    loadRandomPosts();
    loadRandomSports();
  }, []);
  return (
    // class app-dark si darkmode = True
    <div className={!darkMode ? 'app' : 'app dark'}>
      <Header />
      {postsLoaded
      && categoriesLoaded
      && sportsLoaded
      && randomPostsLoaded
      && randomSportsLoaded
      && <Page />}
      {!postsLoaded
      && !categoriesLoaded
      && !sportsLoaded
      && !randomPostsLoaded
      && !randomSportsLoaded
      && (
        <div className="page-loader">
          <Loader />
        </div>
      )}
      <Footer />
    </div>
  );
};

App.propTypes = {
  token: PropTypes.string,
  keepConnexion: PropTypes.func.isRequired,
  loadPosts: PropTypes.func.isRequired,
  postsLoaded: PropTypes.bool.isRequired,
  loadCategories: PropTypes.func.isRequired,
  categoriesLoaded: PropTypes.bool.isRequired,
  loadSports: PropTypes.func.isRequired,
  sportsLoaded: PropTypes.bool.isRequired,
  isAdded: PropTypes.bool.isRequired,
};

App.defaultProps = {
  token: null,
};

// == Export
export default App;
